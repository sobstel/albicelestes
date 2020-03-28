import { matchDate } from "helpers";
import Layout from "components/Layout";
import Score from "./Score";
import Goals from "./Goals";
import Cards from "./Cards";
import Lineups from "./Lineups";
import PenaltyShootout from "./PenaltyShootout";
import Venue from "./Venue";
import SeeAlso from "./SeeAlso";
import Info from "./Info";

const title = (match: MatchItem) => {
  const [homeTeam, awayTeam] = match.teams;
  return [
    `${homeTeam.name} v ${awayTeam.name} ${match.score.join("-")}`,
    matchDate(match, { withYear: true, uppercase: false }),
    match.competition,
  ];
};

export type Props = {
  match: Match;
  prevMatch: MatchItem;
  nextMatch: MatchItem;
  info: MatchInfo;
};

export default function MatchPage({
  match,
  prevMatch,
  nextMatch,
  info,
}: Props) {
  return (
    <Layout title={title(match)}>
      <Score match={match} />
      <Goals match={match} />
      <Lineups match={match} />
      <Cards match={match} />
      <PenaltyShootout match={match} />
      <Venue match={match} />
      <SeeAlso match={match} prevMatch={prevMatch} nextMatch={nextMatch} />
      <Info match={match} info={info} />
    </Layout>
  );
}
