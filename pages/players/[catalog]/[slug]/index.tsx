import Layout from "components/Layout";
import Link from "next/link";
import internalAPI from "lib/api/internal";
import { playerSlug, playerCatalog } from "lib/name";

interface Props {
  id: string;
  name: string;
}

function playerUrl({ id, name }: Props) {
  const catalog = playerCatalog(name);
  const slug = playerSlug(name);

  return `/players/${catalog}/${slug}/${id}`;
}

const OldPlayerPage = ({ id, name }: Props) => {
  return (
    <Layout title={"Error 404"}>
      <p>
        New URL:{" "}
        <Link
          href="/players/[catalog]/[slug]/[id]"
          as={playerUrl({ id, name })}
        >
          <a className="text-blue-600 hover:text-blue-400">
            {playerUrl({ id, name })}
          </a>
        </Link>
      </p>
    </Layout>
  );
};

OldPlayerPage.getInitialProps = async ({ query, res }: any) => {
  const { slug: id } = query;
  const result = await internalAPI(`players/${id}`);
  const { name } = result;

  if (res) {
    res.statusCode = 308;
    res.setHeader("Location", `${playerUrl({ id, name })}`);
  }

  return { id, name };
};

export default OldPlayerPage;
