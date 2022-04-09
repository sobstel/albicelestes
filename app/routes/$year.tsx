import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import type { LoaderFunction, MetaFunction } from "remix";
import { json, useLoaderData } from "remix";

import MatchList from "~/components/MatchList";
import YearHeader from "~/components/YearHeader";
import YearlyNav from "~/components/YearlyNav";
import { MIN_YEAR } from "~/config";
import { fetchMatches } from "~/data";
import { collectTeamStat, getMatchItem, getMatchYear } from "~/helpers";
import { TeamStat } from "~/types";
import { seoDescription, seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { year },
}: Parameters<LoaderFunction>[0]) {
  // TODO: de-duplicate
  if (!year || !/^\d{4}(\-\d{4})?$/.test(year)) {
    throw new Response("Not Found", { status: 404 });
  }

  // TODO: de-duplicate
  const yearParts = R.compact(year?.split("-", 2));
  const lowerYear = yearParts?.[0] ?? String(MIN_YEAR);
  const upperYear = yearParts?.[1] ?? lowerYear;

  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => getMatchYear(match) >= lowerYear),
    R.filter((match) => getMatchYear(match) <= upperYear)
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
    title: seoTitle(["Matches", year]),
    description: seoDescription([
      `Argentina matches in ${year}`,
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
      <YearlyNav activeYear={year} />
      <YearHeader year={year} />
      {stat ? <p className="mb-4">{statPhrase(stat)}</p> : null}
      <MatchList matches={matches} />
    </>
  );
}
