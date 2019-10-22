import hyenaAPI from "../../../lib/api/hyena";
import Layout from "../../../components/Layout";
import Info from "../../../components/match/Info";
import Goals from "../../../components/match/Goals";
import Cards from "../../../components/match/Cards";
import Lineups from "../../../components/match/Lineups";
import PenaltyShootout from "../../../components/match/PenaltyShootout";

interface Props {
  match: any;
}

const title = (match: {
  home_name: string;
  away_name: string;
  date: string;
  competition_name: string;
}) => {
  return [
    `${match.home_name} v ${match.away_name}`,
    match.date,
    match.competition_name
  ].join(" | ");
};

const MatchPage = ({ match }: Props) => (
  <Layout title={title(match)}>
    <Info match={match} />
    <Goals match={match} />
    <Lineups match={match} />
    <Cards match={match} />
    <PenaltyShootout match={match} />
  </Layout>
);

MatchPage.getInitialProps = async ({ query }: any) => {
  const { id } = query;
  const match = await hyenaAPI(`matches/${id}`);
  return { match };
};

export default MatchPage;
