import { NextPageContext } from "next";
import internalAPI from "../../../lib/api/internal";
import Layout from "../../../components/Layout";
import Fixtures from "../../../components/Fixtures";
import Nav from "../../../components/archive/Nav";

interface Props {
  archive: [];
  year: string;
}

const ArchivePage = ({ archive, year }: Props) => {
  return (
    <Layout title={`Archive ${year}`}>
      <Nav year={parseInt(year)} />
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
  return { archive, year };
};

export default ArchivePage;
