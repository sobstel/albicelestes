import internalAPI from "../../../lib/api/internal";
import Layout from "../../../components/Layout";
import Fixtures from "../../../components/Fixtures";

interface Props {
  matchesByYear: [];
  slug: string;
}

const PlayerPage = ({ matchesByYear, slug }: Props) => {
  return (
    <Layout title={`${slug} | Argentina Players`}>
      <h2 className="mb-4 font-semibold uppercase">{slug}</h2>
      {matchesByYear.map(
        ({ year, matches }: { year: number; matches: any[] }) => (
          <Fixtures title={year.toString()} matches={matches} isArchive />
        )
      )}
      <p className="mt-4">THIS LIST OF MATCHES MIGHT NOT BE COMPLETE YET</p>
    </Layout>
  );
};

PlayerPage.getInitialProps = async ({ query }: any) => {
  const { id, slug } = query;
  const result = await internalAPI(`players/${id}`);
  const { matches: matchesByYear } = result;
  return { matchesByYear, slug };
};

export default PlayerPage;
