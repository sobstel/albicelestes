import React from "react";
import pluralize from "pluralize";
import * as R from "remeda";
import { MAX_YEAR } from "config";
import { fetchMatches } from "data";
import { collectTeamStat, getMatchItem, getMatchYear } from "helpers";
import { MatchItem, TeamStat } from "types";
import MatchList from "components/MatchList";
import { Page } from "components/layout";
import YearHeader from "components/YearHeader";
import YearNav from "components/YearNav";

type Context = { params: { year: string } };

export async function getStaticProps(context: Context) {
  // TODO: validate year and show 404 on invalid
  const { year } = context.params;

  const yearBase = parseInt(String(parseInt(year) / 10), 10);
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
    props: {
      year: yearFrom,
      matches: R.map(matches, getMatchItem),
      stat,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: R.pipe(
      R.range(1900, MAX_YEAR + 1),
      R.map((year) => ({ params: { year: year.toString() } }))
    ),
    fallback: false,
  };
}

type Props = {
  matches: Array<MatchItem>;
  year: string;
  stat?: TeamStat | null;
};

// SMELL: copied from Pages/Team
function statPhrase(stat: TeamStat) {
  return `${pluralize("match", stat.mp, true)} (${stat.mw}W ${stat.md}D ${
    stat.ml
  }L), goals: ${stat.gf}-${stat.ga}`;
}

export default function YearIndexPage({ year, matches, stat }: Props) {
  return (
    <Page title={["Matches", year]}>
      <YearNav activeYear={parseInt(year, 10)} />
      <YearHeader year={year} />
      {stat ? <p className="mb-4">{statPhrase(stat)}</p> : null}
      <MatchList matches={matches} />
    </Page>
  );
}
