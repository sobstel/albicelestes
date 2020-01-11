import Layout from "components/Layout";
import Link from "next/link";

type Props = {};

const PlayersPage = ({}: Props) => {
  return (
    <Layout title={`Argentina Players`}>
      <h2 className="mb-4 font-semibold uppercase">Players</h2>
      <ul className="mb-4">
        {"abcdefghijklmnopqrstuvwxyz".split("").map(catalog => (
          <li className="mr-4 inline-flex">
            <Link href="/players/[catalog]" as={`/players/${catalog}`}>
              <a className="text-blue-600 hover:text-blue-400 font-semibold uppercase">
                {catalog}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

PlayersPage.getInitialProps = async ({}: any) => {
  // const { id, slug } = query;
  // const result = await internalAPI(`players/${id}`);
  return {};
};

export default PlayersPage;
