import * as R from "remeda";
import { playersShortNames } from "../../../helpers";
import Fixtures from "../../Fixtures";
import PlayerName from "../../PlayerName";
import Layout from "../../Layout";
import Section from "../../Layout/Section";
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
          {players.map(({ id, name, mp, si, so, g }) => (
            <p key={id}>
              <PlayerName name={name} displayName={shortNames[name]} id={id} />{" "}
              {mp} matches ({si} SI, {so} SO), {g} goals
            </p>
          ))}
        </Section>
      )}
    </Layout>
  );
}
