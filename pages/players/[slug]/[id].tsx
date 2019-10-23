import internalAPI from "../../../lib/api/internal";
import Layout from "../../../components/Layout";
import Fixtures from "../../../components/Fixtures";

interface Props {
  matches: [];
  slug: string;
}

const PlayerPage = ({ matches, slug }: Props) => {
  return (
    <Layout title={`${slug} | Argentina Players`}>
      <p className="mb-4">THIS LIST IS INCOMPLETE (FOR NOW)</p>
      <Fixtures title={slug} matches={matches} isArchive />
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
