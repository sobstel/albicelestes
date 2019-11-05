import { NextPageContext } from "next";
import internalAPI from "../../../lib/api/internal";
import Layout from "../../../components/Layout";
import Fixtures from "../../../components/Fixtures";

interface Props {
  archive: [];
}

const ArchivePage = ({ archive }: Props) => {
  return (
    <Layout title="Archive">
      {archive.map(({ year, matches }: { year: number; matches: any[] }) => (
        <Fixtures title={year.toString()} matches={matches} />
      ))}
    </Layout>
  );
};

ArchivePage.getInitialProps = async ({ query }: NextPageContext) => {
  const year = query.year || new Date().getFullYear();
  const result = await internalAPI(`archive?year=${year}`);
  // TODO: handle errors (empty file) properly
  if (!result) return { archive: [] };
  const { archive } = result;
  return { archive };
};

export default ArchivePage;
