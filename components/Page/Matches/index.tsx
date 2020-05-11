import * as R from "remeda";
import React from "react";
import { playersShortNames } from "helpers";
import { MatchItem, PlayerItem } from "types";
import Fixtures from "components/Fixtures";
import PlayerName from "components/PlayerName";
import Layout from "components/Layout";
import Section from "components/Layout/Section";
import Nav from "./Nav";

export type Props = {
  matches: MatchItem[];
  players: PlayerItem[];
  year: string;
};

function Stat(value: number, symbol: string) {
  if (value <= 0) return null;
  return `${symbol}${value}`;
}

export default function MatchesPage({ year, matches, players }: Props) {
  let shortNames: Record<string, string> = {};
  if (players) {
    shortNames = R.pipe(
      players,
      R.map((player) => player.name),
      playersShortNames
    );
  }

  return (
    <Layout title={["Matches", year]}>
      <Nav year={parseInt(year, 10)} />
      {matches && matches.length > 0 && (
        <Fixtures title={`Matches (${matches.length})`} matches={matches} />
      )}
      {players && players.length > 0 && (
        <Section title={`Players (${players.length})`}>
          {players.map(({ id, name, mp, si, so, g }) => (
            <p key={id}>
              <PlayerName name={name} displayName={shortNames[name]} id={id} />{" "}
              {[
                Stat(mp, "👤"),
                Stat(si, "↑"),
                Stat(so, "↓"),
                Stat(g, "⚽"),
              ].join(" ")}
            </p>
          ))}
        </Section>
      )}
    </Layout>
  );
}
