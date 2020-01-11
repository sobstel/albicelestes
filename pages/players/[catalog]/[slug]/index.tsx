import Layout from "components/Layout";
import Link from "next/link";

interface Props {
  id: string;
  slug: string;
}

function playerUrl({ id, slug }: Props) {
  // @ts-ignore
  const catalog = slug
    .split("-", 2)
    .pop()
    .toString()[0];

  return `/players/${catalog}/${slug}/${id}`;
}

const OldPlayerPage = ({ id, slug }: Props) => {
  return (
    <Layout title={"Error 404"}>
      <p>
        New URL:{" "}
        <Link
          href="/players/[slug]/[catalog]/[id]"
          as={playerUrl({ id, slug })}
        >
          <a className="text-blue-600 hover:text-blue-400">
            {playerUrl({ id, slug })}
          </a>
        </Link>
      </p>
    </Layout>
  );
};

OldPlayerPage.getInitialProps = async ({ query, res }: any) => {
  const { catalog: slug, slug: id } = query;

  if (res) {
    res.statusCode = 308;
    res.setHeader("Location", `${playerUrl({ id, slug })}`);
  }

  return { id, slug };
};

export default OldPlayerPage;
