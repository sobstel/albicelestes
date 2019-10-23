import internalAPI from "../../../../lib/api/internal";
import Layout from "../../../../components/Layout";
import Info from "../../../../components/match/Info";
import Goals from "../../../../components/match/Goals";
import Cards from "../../../../components/match/Cards";
import Lineups from "../../../../components/match/Lineups";
import PenaltyShootout from "../../../../components/match/PenaltyShootout";

const title = (match: {
  home_name: string;
  away_name: string;
  ft: [number, number];
  date: string;
  competition_name: string;
}) => {
  return [
    `${match.home_name} v ${match.away_name} ${match.ft.join("-")}`,
    match.date,
    match.competition_name
  ].join(" - ");
};

const ArchiveMatchPage = ({ match }: any) => {
  return (
    <Layout title={title(match)}>
      <Info match={match} />
      <Goals match={match} />
      <Lineups match={match} />
      <Cards match={match} />
      <PenaltyShootout match={match} />
    </Layout>
  );
};

ArchiveMatchPage.getInitialProps = async ({ query }: any) => {
  const { id } = query;
  const result = await internalAPI(`archive/${id}`);
  const { match } = result;
  return { match };
};

export default ArchiveMatchPage;
