import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, useLoaderData } from "remix";

import { Page } from "~/components/layout";
import MatchList from "~/components/MatchList";
import YearHeader from "~/components/YearHeader";
import YearNav from "~/components/YearNav";
import { fetchMatches } from "~/data";
import { collectTeamStat, getMatchItem, getMatchYear } from "~/helpers";
import { TeamStat } from "~/types";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { year },
}: Parameters<LoaderFunction>[0]) {
  // TODO: validate year and show 404 on invalid

  const yearBase = parseInt(String(parseInt(String(year)) / 10), 10);
  const yearFrom = `${yearBase}0`;
  const yearTo = `${yearBase}9`;

  const matches = R.pipe(
    fetchMatches(),
    R.filter(
      (match) =>
        getMatchYear(match) >= yearFrom && getMatchYear(match) <= yearTo
    )
  );

  const stat = matches.length && collectTeamStat(matches);

  return {
    year: yearFrom,
    matches: R.map(matches, getMatchItem),
    stat,
  };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
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
    <Page title={["Matches", year]}>
      <YearNav activeYear={parseInt(year, 10)} />
      <YearHeader year={year} />
      {stat ? <p className="mb-4">{statPhrase(stat)}</p> : null}
      <MatchList matches={matches} />
    </Page>
  );
}
