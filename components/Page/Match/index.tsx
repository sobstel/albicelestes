import React from "react";
import { matchDate, matchSlug, matchYear } from "helpers";
import { Match, MatchInfo, MatchItem } from "types";
import Layout from "components/Layout";
import Banner from "./Banner";
import Goals from "./Goals";
import Cards from "./Cards";
import Lineups from "./Lineups";
import PenaltyShootout from "./PenaltyShootout";
import Venue from "./Venue";
import SeeAlso from "./SeeAlso";
import Info from "./Info";
import VerifiedNote from "./VerifiedNote";

const title = (
  match: Pick<Match, "date" | "teams" | "score" | "competition">
) => {
  const [homeTeam, awayTeam] = match.teams;
  return [
    `${homeTeam.name} v ${awayTeam.name} ${match.score.join("-")}`,
    matchDate(match, { withYear: true, uppercase: false }),
    match.competition,
  ];
};

export type Props = {
  match: Match;
  prevMatch?: MatchItem;
  nextMatch?: MatchItem;
  info?: MatchInfo;
};

export default function MatchPage({
  match,
  prevMatch,
  nextMatch,
  info = {},
}: Props) {
  return (
    <Layout
      title={title(match)}
      canonicalPath={`/matches/${matchYear(match)}/${matchSlug(match)}`}
    >
      <Banner match={match} />
      <Goals match={match} />
      <Lineups match={match} />
      <Cards match={match} />
      <PenaltyShootout match={match} />
      <Venue match={match} />
      <Info matchInfo={info} />
      <SeeAlso match={match} prevMatch={prevMatch} nextMatch={nextMatch} />
      <VerifiedNote match={match} />
    </Layout>
  );
}
