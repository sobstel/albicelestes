import internalAPI from "lib/api/internal";
import { playerCatalog, playerSlug } from "lib/name";
import Fixtures from "components/Fixtures";
import Layout from "components/Layout";
import Section from "components/layout/Section";
import Link from "components/layout/Link";

type Props = {
  matches: PartialMatch[];
  players: any[];
  teams: any[];
};

const IndexPage = ({ matches, players, teams }: Props) => (
  <Layout title="Ultimate La Selección Argentina Database 🇦🇷">
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

IndexPage.getInitialProps = async ({ res }: any) => {
  const result = await internalAPI("index");

  if (res) {
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, max-age=60, stale-while-revalidate"
    );
  }

  return { ...result };
};

export default IndexPage;
