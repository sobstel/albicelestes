import React from "react";
import {
  getMatchDate,
  getMatchScore,
  getMatchSlug,
  getMatchYear,
} from "helpers";
import { Match, MatchItem } from "types";
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
import getMatchTeamIndex from "helpers/getters/getMatchTeamIndex";

const title = (
  match: Pick<Match, "date" | "teams" | "score" | "competition">
) => {
  const [homeTeam, awayTeam] = match.teams;
  return [
    `${homeTeam.name} v ${awayTeam.name} ${match.score.join("-")}`,
    getMatchDate(match, { withYear: true, uppercase: false }),
    match.competition,
  ];
};

export type Props = {
  match: Match;
  prevMatch?: MatchItem;
  nextMatch?: MatchItem;
};

function generateDescription(match: Match) {
  const myTeamIndex = getMatchTeamIndex(match);

  let lineupDescription = "";
  if (match.lineups[myTeamIndex]) {
    lineupDescription = match.lineups[myTeamIndex]
      .map((app) => app.name)
      .join(", ")
      .concat(".");
  }

  const description = `Details about ${getMatchScore(
    match
  )} football game played on ${getMatchDate(match, {
    withYear: true,
    uppercase: false,
  })} (${match.competition}). ${lineupDescription}`.trim();

  return description;
}

export default function MatchPage({ match, prevMatch, nextMatch }: Props) {
  return (
    <Layout
      title={title(match)}
      description={generateDescription(match)}
      canonicalPath={`/matches/${getMatchYear(match)}/${getMatchSlug(match)}`}
    >
      <Banner match={match} />
      <Goals match={match} />
      <PenaltyShootout match={match} />
      <Lineups match={match} />
      <Cards match={match} />
      <Venue match={match} />
      <Info match={match} />
      <SeeAlso match={match} prevMatch={prevMatch} nextMatch={nextMatch} />
      <VerifiedNote match={match} />
    </Layout>
  );
}
