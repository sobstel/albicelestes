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
          {players.map(({ name, mp, si, so, g }) => (
            <p key={name}>
              <PlayerName name={name} displayName={shortNames[name]} linkify />{" "}
              {mp}
              {(si > 0 || so > 0) && (
                <>
                  {" "}
                  ({so > 0 && `${so}↓`}
                  {si > 0 && so > 0 && " "}
                  {si > 0 && `${si}↑`})
                </>
              )}
              {g > 0 && `, ${g}G`}
            </p>
          ))}
        </Section>
      )}
    </Layout>
  );
}
