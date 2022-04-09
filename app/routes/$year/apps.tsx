import React from "react";
import * as R from "remeda";
import type { LoaderFunction } from "remix";
import { json, MetaFunction, useLoaderData } from "remix";

import { Block } from "~/components/layout";
import PlayerName from "~/components/PlayerName";
import YearHeader from "~/components/YearHeader";
import { MAX_YEAR, MIN_YEAR } from "~/config";
import { fetchMatches } from "~/data";
import { collectPlayers, getMatchYear } from "~/helpers";
import { seoDescription, seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { year, slug },
}: Parameters<LoaderFunction>[0]) {
  // TODO: de-duplicate
  if (!year || !/^\d{4}(\-\d{4})?$/.test(year)) {
    throw new Response("Not Found", { status: 404 });
  }

  // TODO: de-duplicate
  const yearParts = R.compact(year?.split("-", 2));
  const lowerYear = yearParts?.[0] ?? String(MIN_YEAR);
  const upperYear = yearParts?.[1] ?? lowerYear;

  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => getMatchYear(match) >= lowerYear),
    R.filter((match) => getMatchYear(match) <= upperYear)
  );

  const players = R.pipe(
    matches,
    collectPlayers,
    R.sortBy((player) => -player.mp)
  );

  return {
    year,
    players,
  };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

export const meta: MetaFunction = ({
  data: { year, players },
}: {
  data: LoaderData;
}) => {
  return {
    title: seoTitle(["Player appearances", year]),
    description: seoDescription([
      R.pipe(
        players,
        R.take(10),
        R.map((player) => `${player.name} (${player.mp})`)
      ).join(", "),
    ]),
  };
};

export default function YearAppsPage() {
  const { players, year } = useLoaderData<LoaderData>();
  return (
    <>
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
    </>
  );
}
