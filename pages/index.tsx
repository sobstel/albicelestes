import internalAPI from "lib/api/internal";
import Layout from "components/Layout";
import Fixtures from "components/Fixtures";

type Props = {
  matches: PartialMatch[];
}

const IndexPage = ({ matches }: Props) => (
  <Layout title="Ultimate La Selección Database">
    <Fixtures title="Recent matches" matches={matches} />
  </Layout>
);

IndexPage.getInitialProps = async ({ res }: any) => {
  const result = await internalAPI(`matches/recent`);

  if (res) {
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, max-age=60, stale-while-revalidate"
    );
  }

  const { matches } = result;
  return { matches };
};

export default IndexPage;
