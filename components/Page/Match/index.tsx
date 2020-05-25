import React from "react";
import { matchDate, matchScore, matchSlug, matchYear } from "helpers";
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
import matchTeamIndex from "helpers/matchTeamIndex";

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

function generateDescription(match: Match) {
  const myTeamIndex = matchTeamIndex(match);

  let lineupDescription = "";
  if (match.lineups[myTeamIndex]) {
    lineupDescription = match.lineups[myTeamIndex]
      .map((app) => app.name)
      .join(", ")
      .concat(".");
  }

  const description = `Details about ${matchScore(
    match
  )} football game played on ${matchDate(match, {
    withYear: true,
    uppercase: false,
  })} (${match.competition}). ${lineupDescription}`.trim();

  return description;
}

export default function MatchPage({
  match,
  prevMatch,
  nextMatch,
  info = {},
}: Props) {
  return (
    <Layout
      title={title(match)}
      description={generateDescription(match)}
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
