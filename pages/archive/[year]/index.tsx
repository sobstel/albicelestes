import { NextPageContext } from "next";
import internalAPI from "../../../lib/api/internal";
import Layout from "../../../components/Layout";
import Fixtures from "../../../components/Fixtures";
import Nav from "../../../components/archive/Nav";

interface Props {
  matches: [];
  year: string;
}

const ArchivePage = ({ matches, year }: Props) => {
  return (
    <Layout title={`Archive ${year}`}>
      <Nav year={parseInt(year)} />
      <Fixtures matches={matches} />
    </Layout>
  );
};

ArchivePage.getInitialProps = async ({ query }: NextPageContext) => {
  const year = query.year || new Date().getFullYear();
  const result = await internalAPI(`archive?year=${year}`);
  // TODO: handle errors (empty file) properly
  if (!result) return { matches: [] };
  const { matches } = result;
  return { matches, year };
};

export default ArchivePage;
