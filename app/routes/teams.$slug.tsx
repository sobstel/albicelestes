import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";

import { Header } from "~/components/layout";
import MatchList from "~/components/MatchList";
import { fetchMatches } from "~/data";
import {
  collectTeamStat,
  findTeamName,
  getMatchDate,
  getMatchTeams,
} from "~/helpers";
import { getMatchItem, getMatchScore, getTeamSlug } from "~/helpers";
import { TeamStat } from "~/types";
import { seoDescription, seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { slug },
}: Parameters<LoaderFunction>[0]) {
  const matches = R.pipe(
    fetchMatches(),
    R.filter(
      (match) => !!R.find(match.teams, (team) => getTeamSlug(team) === slug)
    )
  );
  const name = findTeamName(matches, String(slug));
  const stat = collectTeamStat(matches);

  return {
    slug,
    name,
    matches: matches.map(getMatchItem),
    stat,
  };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

function statPhrase(stat: TeamStat) {
  return `${pluralize("match", stat.mp, true)} (${stat.mw}W ${stat.md}D ${
    stat.ml
  }L), goals: ${stat.gf}-${stat.ga}`;
}

export const meta: MetaFunction = ({
  data: { name, matches, stat },
}: {
  data: LoaderData;
}) => {
  const lastMatch = R.last(matches);

  return {
    title: seoTitle([`Argentina v ${name}`, "Head-to-Head"]),
    description: seoDescription([
      statPhrase(stat),
      lastMatch
        ? [
            `Last match: ${getMatchDate(lastMatch, { withYear: true })}`,
            lastMatch.competition,
            getMatchTeams(lastMatch),
          ].join(", ")
        : undefined,
    ]),
  };
};

export default function TeamPage() {
  const { name, matches, stat } = useLoaderData<LoaderData>();
  const title = `Argentina v ${name}`;
  return (
    <>
      <Header text={title} top />
      <p className="mb-4">{statPhrase(stat)}</p>
      <MatchList matches={matches} />
    </>
  );
}
