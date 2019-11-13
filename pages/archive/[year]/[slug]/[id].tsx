import { NextPageContext } from "next";
import internalAPI from "lib/api/internal";
import Layout from "components/Layout";
import Info from "components/match/Info";
import Goals from "components/match/Goals";
import Cards from "components/match/Cards";
import Lineups from "components/match/Lineups";
import PenaltyShootout from "components/match/PenaltyShootout";

const title = (match: {
  teams: [{ slug?: string; name: string }, { slug?: string; name: string }];
  score: [number, number];
  date: string;
  competition: string;
}) => {
  const [homeTeam, awayTeam] = match.teams;
  return [
    `${homeTeam.name} v ${awayTeam.name} ${match.score.join("-")}`,
    match.date,
    match.competition
  ].join(" | ");
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

ArchiveMatchPage.getInitialProps = async ({ query }: NextPageContext) => {
  const { id } = query;
  const result = await internalAPI(`archive/${id}`);
  const { match } = result;
  return { match };
};

export default ArchiveMatchPage;
