import slugify from "slugify";
import Link from "next/link";
import internalAPI from "lib/api/internal";
import Layout from "components/Layout";
import Nav from "components/players/Nav";

type Props = { catalog: string; players: any[] };

const PlayersPage = ({ catalog, players }: Props) => {
  console.log(players);
  return (
    <Layout title={`${catalog} | Argentina Players`}>
      <Nav catalog={catalog} />

      {players.length > 0 && (
        <>
          <h2 className="mb-4 font-semibold uppercase">Players</h2>
          {players.map(({ id, name, mp }) => {
            const slug = slugify(name, { lower: true });
            // @ts-ignore
            const catalog = slug
              .split("-", 2)
              .pop()
              .toString()[0];

            return (
              <p key={id}>
                <Link
                  href="/players/[slug]/[catalog]/[id]"
                  as={`/players/${catalog}/${slug}/${id}`}
                >
                  <a className="text-blue-600 hover:text-blue-400" title={name}>
                    {name}
                  </a>
                </Link>{" "}
                ({mp})
              </p>
            );
          })}
        </>
      )}
    </Layout>
  );
};

PlayersPage.getInitialProps = async ({ query }: any) => {
  const { catalog } = query;
  const result = await internalAPI(`players?catalog=${catalog}`);
  return { catalog, ...result };
};

export default PlayersPage;
