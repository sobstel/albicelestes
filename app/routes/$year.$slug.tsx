import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, useLoaderData } from "remix";

import { Header, Page } from "~/components/layout";
import Cards from "~/components/Match/Cards";
import Goals from "~/components/Match/Goals";
import Info from "~/components/Match/Info";
import Lineups from "~/components/Match/Lineups";
import PenaltyShootout from "~/components/Match/PenaltyShootout";
import SeeAlso from "~/components/Match/SeeAlso";
import Venue from "~/components/Match/Venue";
import VerifiedNote from "~/components/Match/VerifiedNote";
import { fetchMatches } from "~/data";
import {
  getMatchDate,
  getMatchItem,
  getMatchScore,
  getMatchSlug,
  getMatchTeams,
  getMatchYear,
} from "~/helpers";
import { Match } from "~/types";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { year, slug },
}: Parameters<LoaderFunction>[0]) {
  const matches = fetchMatches();
  const idx = matches.findIndex(
    (match) => getMatchYear(match) === year && getMatchSlug(match) === slug
  );

  const match = matches[idx];
  const prevMatch = matches[idx - 1] ? getMatchItem(matches[idx - 1]) : null;
  const nextMatch = matches[idx + 1] ? getMatchItem(matches[idx + 1]) : null;

  return { match, prevMatch, nextMatch };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

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

// function generateDescription(match: Match) {
//   const myTeamIndex = getMatchTeamIndex(match);
//
//   let lineupDescription = "";
//   if (match.lineups[myTeamIndex]) {
//     lineupDescription = match.lineups[myTeamIndex]
//       .map((app) => app.name)
//       .join(", ")
//       .concat(".");
//   }
//
//   const description = `Details about ${getMatchTeams(match)} ${getMatchScore(
//     match
//   )} football game played on ${getMatchDate(match, {
//     withYear: true,
//     uppercase: false,
//   })} (${match.competition}). ${lineupDescription}`.trim();
//
//   return description;
// }

export default function MatchPage() {
  const { match, prevMatch, nextMatch } = useLoaderData<LoaderData>();

  return (
    <Page title={title(match)}>
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
      <SeeAlso
        match={match}
        prevMatch={prevMatch || undefined}
        nextMatch={nextMatch || undefined}
      />
      <VerifiedNote match={match} />
    </Page>
  );
}
