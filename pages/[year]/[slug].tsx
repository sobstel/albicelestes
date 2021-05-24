import React from "react";
import * as R from "remeda";
import { useRouter } from "next/router";
import { MAX_YEAR } from "config";
import { fetchMatches } from "data";
import {
  getMatchDate,
  getMatchItem,
  getMatchScore,
  getMatchSlug,
  getMatchTeams,
  getMatchYear,
} from "helpers";
import { Match, MatchItem } from "types";
import { Page, Header } from "components/layout";
import Goals from "components/Match/Goals";
import Cards from "components/Match/Cards";
import Lineups from "components/Match/Lineups";
import PenaltyShootout from "components/Match/PenaltyShootout";
import Venue from "components/Match/Venue";
import SeeAlso from "components/Match/SeeAlso";
import Info from "components/Match/Info";
import VerifiedNote from "components/Match/VerifiedNote";
import getMatchTeamIndex from "helpers/getMatchTeamIndex";

type Context = { params: { year: string; slug: string } };

export async function getStaticProps(context: Context) {
  const { year, slug } = context.params;

  const matches = fetchMatches();
  const idx = matches.findIndex(
    (match) => getMatchYear(match) === year && getMatchSlug(match) === slug
  );

  const match = matches[idx];
  const prevMatch = matches[idx - 1] ? getMatchItem(matches[idx - 1]) : null;
  const nextMatch = matches[idx + 1] ? getMatchItem(matches[idx + 1]) : null;

  return { props: { match, prevMatch, nextMatch } };
}

export async function getStaticPaths() {
  return {
    paths: R.pipe(
      fetchMatches(),
      R.filter(
        (match) =>
          getMatchYear(match) >= String(MAX_YEAR - 4) ||
          /World Cup|Copa America/i.test(match.competition)
      ),
      R.map((match) => ({
        params: {
          year: getMatchYear(match),
          slug: getMatchSlug(match),
        },
      }))
    ),
    fallback: true,
  };
}

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

type Props = {
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

  const description = `Details about ${getMatchTeams(match)} ${getMatchScore(
    match
  )} football game played on ${getMatchDate(match, {
    withYear: true,
    uppercase: false,
  })} (${match.competition}). ${lineupDescription}`.trim();

  return description;
}

export default function MatchPage({ match, prevMatch, nextMatch }: Props) {
  const router = useRouter();
  if (router.isFallback) {
    // FIXME: have some loading component
    return <div>Loading...</div>;
  }

  return (
    <Page title={title(match)} description={generateDescription(match)}>
      <Header text={`${getMatchTeams(match)} ${getMatchScore(match)}`} top />
      <p>
        {getMatchDate(match, { withYear: true })}, {match.competition}
      </p>
      <Goals match={match} />
      <PenaltyShootout match={match} />
      <Lineups match={match} />
      <Cards match={match} />
      <Venue match={match} />
      <Info match={match} />
      <SeeAlso match={match} prevMatch={prevMatch} nextMatch={nextMatch} />
      <VerifiedNote match={match} />
    </Page>
  );
}
