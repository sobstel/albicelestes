import internalAPI from "../lib/api/internal";
import Layout from "../components/Layout";
import Fixtures from "../components/Fixtures";

interface Props {
  archive: [];
}

const ArchivePage = ({ archive }: Props) => {
  return (
    <Layout title="Archive">
      <p className="mb-4">THIS LIST IS INCOMPLETE (FOR NOW)</p>
      {archive.map(({ year, matches }: { year: number; matches: any[] }) => (
        <Fixtures title={year.toString()} matches={matches} isArchive />
      ))}
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
