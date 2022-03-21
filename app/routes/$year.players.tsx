import React from "react";
import * as R from "remeda";
import type { LoaderFunction } from "remix";
import { json, MetaFunction, useLoaderData } from "remix";

import { Block, Page } from "~/components/layout";
import PlayerName from "~/components/PlayerName";
import YearHeader from "~/components/YearHeader";
import YearNav from "~/components/YearNav";
import { MAX_YEAR, TEAM_NAME } from "~/config";
import { fetchMatches } from "~/data";
import { collectPlayers, getMatchYear } from "~/helpers";
import { seoDescription, seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({ params }: Parameters<LoaderFunction>[0]) {
  const year = params?.year || MAX_YEAR.toString();

  const yearBase = parseInt(String(parseInt(year) / 10), 10);
  const yearFrom = `${yearBase}0`;
  const yearTo = `${yearBase}9`;

  const matches = R.pipe(
    fetchMatches(),
    R.filter(
      (match) =>
        getMatchYear(match) >= yearFrom && getMatchYear(match) <= yearTo
    )
  );

  const players = R.pipe(
    matches,
    collectPlayers,
    R.sortBy((player) => -player.mp)
  );

  return {
    year: yearFrom,
    players,
  };
}

export const loader: LoaderFunction = async (args) => {
  const {
    params: { year },
  } = args;
  if (!year || year < "1900" || year > String(MAX_YEAR)) {
    // TODO
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<LoaderData>(await getLoaderData(args));
};

export const meta: MetaFunction = ({
  data: { year, players },
}: {
  data: LoaderData;
}) => {
  return {
    title: seoTitle(["Player appearances", `${year}s`]),
    description: seoDescription([
      R.pipe(
        players,
        R.take(10),
        R.map((player) => `${player.name} (${player.mp})`)
      ).join(", "),
    ]),
  };
};

export default function YearPlayersPage() {
  const { players, year } = useLoaderData<LoaderData>();
  return (
    <Page>
      <YearNav activeYear={parseInt(year, 10)} />
      <YearHeader year={year} />

      <Block>
        <table>
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-right ">
                <abbr title="Matches Played">MP</abbr>
              </th>
              <th className="text-right ">
                <abbr title="Sub in">in</abbr>
              </th>
              <th className="text-right ">
                <abbr title="Sub out">out</abbr>
              </th>
              <th className="text-right">
                <abbr title="Goals Scored">GS</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map(({ name, mp, si, so, g }) => (
              <tr key={name}>
                <td className="text-left">
                  <PlayerName name={name} linkify />
                </td>
                <td className="text-right">{mp}</td>
                <td className="text-right">{si > 0 && si}</td>
                <td className="text-right">{so > 0 && so}</td>
                <td className="text-right">{g > 0 && g}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Block>
    </Page>
  );
}
