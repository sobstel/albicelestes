import internalAPI from "lib/api/internal";
import Layout from "components/Layout";
import Fixtures from "components/Fixtures";

type Props = {
  recentMatches: PartialMatch[];
  majorMatches: PartialMatch[];
};

const IndexPage = ({ recentMatches, majorMatches }: Props) => (
  <Layout title="Ultimate La Selección Argentina Database">
    <Fixtures title="Recent matches" matches={recentMatches} />
    <Fixtures title="Major matches" matches={majorMatches} />
  </Layout>
);

IndexPage.getInitialProps = async ({ res }: any) => {
  const result = await internalAPI(`home`);

  if (res) {
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, max-age=60, stale-while-revalidate"
    );
  }

  const { recentMatches, majorMatches } = result;
  return { recentMatches, majorMatches };
};

export default IndexPage;
