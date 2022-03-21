import React from "react";
import type { LoaderFunction, MetaFunction } from "remix";
import { json, useLoaderData } from "remix";

import { Header, Page } from "~/components/layout";
import Cards from "~/components/Match/Cards";
import Goals from "~/components/Match/Goals";
import Info from "~/components/Match/Info";
import Lineups from "~/components/Match/Lineups";
import PenaltyShootout from "~/components/Match/PenaltyShootout";
import SeeAlso from "~/components/Match/SeeAlso";
import Venue from "~/components/Match/Venue";
import VerifiedNote from "~/components/Match/VerifiedNote";
import { MAX_YEAR, TEAM_NAME } from "~/config";
import { fetchMatches } from "~/data";
import {
  getMatchDate,
  getMatchItem,
  getMatchScore,
  getMatchSlug,
  getMatchTeams,
  getMatchYear,
} from "~/helpers";
import { getMatchTeamIndex } from "~/helpers";
import { seoDescription, seoTitle } from "~/utility";

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
  const {
    params: { year },
  } = args;
  if (!year || year < "1900" || year > String(MAX_YEAR)) {
    // TODO
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<LoaderData>(await getLoaderData(args));
};

export const meta: MetaFunction = ({
  data: { match },
}: {
  data: LoaderData;
}) => {
  const myTeamLineupString = match.lineups[getMatchTeamIndex(match)]
    ?.map((app) => app.name)
    .join(", ");
  return {
    title: seoTitle([
      `${getMatchTeams(match)} ${match.score.join(":")}`,
      getMatchDate(match, { withYear: true, uppercase: false }),
      match.competition,
    ]),
    description: seoDescription([
      `${match.competition} ${getMatchYear(match)}`,
      myTeamLineupString && `${TEAM_NAME}: ${myTeamLineupString}`,
    ]),
  };
};

export default function MatchPage() {
  const { match, prevMatch, nextMatch } = useLoaderData<LoaderData>();

  return (
    <Page>
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
