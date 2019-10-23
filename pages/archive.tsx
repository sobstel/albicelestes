import internalAPI from "../lib/api/internal";
import Layout from "../components/Layout";
import Fixtures from "../components/Fixtures";

interface Props {
  archive: [];
}

const ArchivePage = ({ archive }: Props) => {
  return (
    <Layout title="Archive">
      {archive.map(({ year, matches }: { year: number; matches: any[] }) => (
        <Fixtures title={year.toString()} matches={matches} isArchive />
      ))}
      <p className="mt-4">THIS LIST OF MATCHES MIGHT NOT BE COMPLETE YET</p>
    </Layout>
  );
};

ArchivePage.getInitialProps = async () => {
  const result = await internalAPI("archive");
  // TODO: handle errors (empty file) properly
  if (!result) return { archive: [] };
  const { archive } = result;
  return { archive };
};

export default ArchivePage;
