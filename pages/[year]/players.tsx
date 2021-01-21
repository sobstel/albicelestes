import React from "react";
import * as R from "remeda";
import { MIN_YEAR, MAX_YEAR } from "config";
import { fetchMatches } from "data";
import { collectPlayers, getMatchYear, produceShortNames } from "helpers";
import { PlayerItem } from "types";
import Layout from "components/Layout";
import Section from "components/Layout/Section";
import Separator from "components/Layout/Separator";
import PlayerName from "components/PlayerName";
import MatchesNav from "components/MatchesNav";
import MatchesHeader from "components/MatchesHeader";

type Props = {
  players: PlayerItem[];
  year: string;
};

type Context = { params: { year: string } };

export async function getStaticPaths() {
  return {
    paths: R.pipe(
      R.range(MIN_YEAR, MAX_YEAR + 1),
      R.map((year) => ({ params: { year: year.toString() } }))
    ),
    fallback: false,
  };
}

export async function getStaticProps(context: Context) {
  const year = context.params?.year || MAX_YEAR.toString();

  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => getMatchYear(match) === year)
  );

  const players = R.pipe(
    matches,
    collectPlayers,
    R.sortBy((player) => -player.mp)
  );

  return {
    props: { year, players },
  };
}

export default function DateRangeStats({ players, year }: Props) {
  let shortNames: Record<string, string> = {};
  if (players) {
    shortNames = R.pipe(
      players,
      R.map((player) => player.name),
      produceShortNames
    );
  }

  return (
    <Layout title={["Players"]}>
      <MatchesNav year={parseInt(year, 10)} />
      <Separator />
      <MatchesHeader year={year} />

      <Section>
        <table>
          <thead>
            <tr>
              <th className="text-left font-semibold">Name</th>
              <th className="pl-2 text-right font-semibold">
                <abbr title="Matches Played">MP</abbr>
              </th>
              <th className="pl-2 text-right font-semibold">
                <abbr title="Sub in">in</abbr>
              </th>
              <th className="pl-2 text-right font-semibold">
                <abbr title="Sub out">out</abbr>
              </th>
              <th className="pl-2 text-right font-semibold">
                <abbr title="Goals Scored">GS</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map(({ name, mp, si, so, g }) => (
              <tr key={name}>
                <td className="text-left">
                  <PlayerName
                    name={name}
                    displayName={shortNames[name]}
                    linkify
                  />
                </td>
                <td className="pl-2 text-right">{mp}</td>
                <td className="pl-2 text-right">{si > 0 && si}</td>
                <td className="pl-2 text-right">{so > 0 && so}</td>
                <td className="pl-2 text-right">{g > 0 && g}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </Layout>
  );
}
