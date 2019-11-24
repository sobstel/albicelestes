import { toNumber } from "lodash";
import { NextPageContext } from "next";
import Nav from "components/matches/Nav";
import Fixtures from "components/Fixtures";
import Layout from "components/Layout";
import internalAPI from "lib/api/internal";

interface Props {
  matches: [];
  year: string;
}

const MatchesPage = ({ matches, year }: Props) => {
  return (
    <Layout title={`Argentina matches ${year}`}>
      <Nav year={toNumber(year)} />
      <Fixtures matches={matches} />
    </Layout>
  );
};

MatchesPage.getInitialProps = async ({ query }: NextPageContext) => {
  const year = query.year || new Date().getFullYear();
  const result = await internalAPI(`matches?year=${year}`);
  // TODO: handle errors (empty file) properly
  if (!result) return { matches: [] };
  const { matches } = result;
  return { matches, year };
};

export default MatchesPage;
