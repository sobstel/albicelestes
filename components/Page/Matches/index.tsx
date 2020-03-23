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
  const names = players && players.map((player) => player.name);

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
              <PlayerName name={name} names={names} id={id} /> {mp} matches (
              {si} SI, {so} SO), {g} goals
            </p>
          ))}
        </Section>
      )}
    </Layout>
  );
}
