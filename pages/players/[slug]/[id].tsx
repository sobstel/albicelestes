import internalAPI from "../../../lib/api/internal";
import Layout from "../../../components/Layout";
import Fixtures from "../../../components/Fixtures";

interface Props {
  matches: [];
  slug: string;
}

const PlayerPage = ({ matches, slug }: Props) => {
  const name = slug.replace(/-/g, " ").toUpperCase();
  const title = name;
  return (
    <Layout title={`${title} | Argentina Players`}>
      <h2 className="mb-4 font-semibold uppercase">{title}</h2>
      <Fixtures matches={matches} />
    </Layout>
  );
};

PlayerPage.getInitialProps = async ({ query }: any) => {
  const { id, slug } = query;
  const result = await internalAPI(`players/${id}`);
  const { matches } = result;
  return { matches, slug };
};

export default PlayerPage;
