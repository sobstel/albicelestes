import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import type { LoaderFunction, MetaFunction } from "remix";
import { json, useLoaderData } from "remix";

import MatchList from "~/components/MatchList";
import YearHeader from "~/components/YearHeader";
import YearNav from "~/components/YearNav";
import { MAX_YEAR, MIN_YEAR } from "~/config";
import { fetchMatches } from "~/data";
import { collectTeamStat, getMatchItem, getMatchYear } from "~/helpers";
import { TeamStat } from "~/types";
import { seoDescription, seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { year },
}: Parameters<LoaderFunction>[0]) {
  if (!year || year < String(MIN_YEAR) || year > String(MAX_YEAR)) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => getMatchYear(match) === year)
  );

  const stat = matches.length > 0 && collectTeamStat(matches);

  return {
    year,
    matches: R.map(matches, getMatchItem),
    stat,
  };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

export const meta: MetaFunction = ({
  data: { year, stat },
}: {
  data: LoaderData;
}) => {
  return {
    title: seoTitle(["Matches", `${year}s`]),
    description: seoDescription([
      `Argentina matches in ${year}s`,
      stat ? statPhrase(stat) : undefined,
    ]),
  };
};

// SMELL: copied from Pages/Team
function statPhrase(stat: TeamStat) {
  return `${pluralize("match", stat.mp, true)} (${stat.mw}W ${stat.md}D ${
    stat.ml
  }L), goals: ${stat.gf}-${stat.ga}`;
}

export default function YearIndexPage() {
  const { year, matches, stat } = useLoaderData<LoaderData>();
  return (
    <>
      <YearHeader year={year} />
      {stat ? <p className="mb-4">{statPhrase(stat)}</p> : null}
      <MatchList matches={matches} />
    </>
  );
}
