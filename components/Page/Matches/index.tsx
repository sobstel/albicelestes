import * as R from "remeda";
import pluralize from "pluralize";
import React from "react";
import { produceShortNames } from "helpers";
import { MatchItem, PlayerItem, TeamStat } from "types";
import Fixtures from "components/Fixtures";
import PlayerName from "components/PlayerName";
import Layout from "components/Layout";
import Header from "components/Layout/Header";
import Section from "components/Layout/Section";
import Separator from "components/Layout/Separator";
import Nav from "./Nav";

export type Props = {
  matches: MatchItem[];
  players: PlayerItem[];
  year: string;
  stat: TeamStat;
};

// SMELL: copied from Pages/Team
function statPhrase(stat: TeamStat) {
  return `${pluralize("match", stat.mp, true)} (${stat.mw}W ${stat.md}D ${
    stat.ml
  }L), goals: ${stat.gf}-${stat.ga}`;
}

export default function MatchesPage({ year, matches, players, stat }: Props) {
  let shortNames: Record<string, string> = {};
  if (players) {
    shortNames = R.pipe(
      players,
      R.map((player) => player.name),
      produceShortNames
    );
  }

  return (
    <Layout title={["Matches", year]} canonicalPath={`/${year}`}>
      <Nav year={parseInt(year, 10)} />
      <Separator />

      <Header
        text={`${year}`}
        top
        nav={[
          { text: "matches", href: `/${year}` },
          { text: "caps", href: `/${year}/caps` },
          { text: "stats", href: `/${year}/stats` },
        ]}
      />
      <p className="mb-4">{statPhrase(stat)}</p>

      {matches && matches.length > 0 && (
        <Fixtures title={`Matches (${matches.length})`} matches={matches} />
      )}

      {players && players.length > 0 && (
        <Section title={`Players (${players.length})`}>
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
      )}
    </Layout>
  );
}
