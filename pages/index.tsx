import * as R from "remeda";
import { fetchMatches } from "db";
import { collectPlayers, collectTeams } from "../functions";
import { matchItem, playerCatalog, playerSlug } from "../helpers";
import Fixtures from "../components/Fixtures";
import Layout from "../components/Layout";
import Section from "../components/Layout/Section";
import Link from "../components/Layout/Link";

type Props = {
  matches: MatchItem[];
  players: PlayerItem[];
  teams: TeamItem[];
};

export default function IndexPage({ matches, players, teams }: Props) {
  return (
    <Layout title={["Ultimate La Selección Argentina Archive 🇦🇷"]}>
      <Fixtures title="Top matches" matches={matches} />
      <Section title="Top players">
        {players.map(({ id, name, mp }) => {
          const slug = playerSlug(name);
          const catalog = playerCatalog(name);
          return (
            <p key={id}>
              <Link
                href="/players/[catalog]/[slug]/[id]"
                as={`/players/${catalog}/${slug}/${id}`}
              >
                {name}
              </Link>{" "}
              ({mp})
            </p>
          );
        })}
      </Section>
      <Section title="Top rival teams">
        {teams.map(({ name, slug, mp }) => (
          <p key={slug}>
            <Link href="/teams/[slug]" as={`/teams/${slug}`}>
              {name}
            </Link>{" "}
            ({mp})
          </p>
        ))}
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => !!R.find(["lk9o5", "xrm53"], (id) => id === match.id)),
    R.map(matchItem)
  );

  const players = R.pipe(
    fetchMatches(),
    collectPlayers,
    R.sortBy((player) => -player.mp),
    R.take(20)
  );

  const teams = R.pipe(
    fetchMatches(),
    collectTeams,
    R.sortBy((team) => -team.mp),
    R.take(15)
  );

  return { props: { matches, players, teams } };
}
