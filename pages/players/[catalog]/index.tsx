import internalAPI from "lib/api/internal";
import { playerName, playerCatalog, playerSlug } from "lib/name";
import Nav from "components/players/Nav";
import Layout from "components/Layout";
import Section from "components/layout/Section";
import Link from "components/layout/Link";

type Props = { catalog: string; players: any[] };

const PlayersPage = ({ catalog, players }: Props) => {
  return (
    <Layout title={`Players | ${catalog.toUpperCase()}`}>
      <Nav catalog={catalog} />

      {players.length > 0 && (
        <Section title="Players">
          {players.map(({ id, name, mp }) => {
            const _playerName = playerName(name);
            const slug = playerSlug(name);
            const catalog = playerCatalog(name);

            return (
              <p key={id}>
                <Link
                  href="/players/[catalog]/[slug]/[id]"
                  as={`/players/${catalog}/${slug}/${id}`}
                  title={name}
                  important={mp >= 20}
                >
                  {_playerName.lastName},{" "}
                  {[_playerName.firstName, _playerName.middleName]
                    .join(" ")
                    .trim()}
                </Link>{" "}
                ({mp})
              </p>
            );
          })}
        </Section>
      )}
    </Layout>
  );
};

PlayersPage.getInitialProps = async ({ query, res }: any) => {
  const { catalog } = query;
  const result = await internalAPI(`players?catalog=${catalog}`);

  if (res) {
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, max-age=60, stale-while-revalidate"
    );
  }

  return { catalog, ...result };
};

export default PlayersPage;
