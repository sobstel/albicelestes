import React from "react";
import pluralize from "pluralize";
import * as R from "remeda";
import { MIN_YEAR, MAX_YEAR } from "config";
import { fetchMatches } from "data";
import {
  collectPlayers,
  collectTeamStat,
  getMatchItem,
  getMatchYear,
} from "helpers";
import { MatchItem, TeamStat } from "types";
import Fixtures from "components/Fixtures";
import { Page } from "components/layout";
import MatchesHeader from "components/MatchesHeader";
import MatchesNav from "components/MatchesNav";

type Context = { params: { year: string } };

export async function getStaticProps(context: Context) {
  const year = context.params?.year || MAX_YEAR.toString();

  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => getMatchYear(match) === year)
  );

  if (!matches) {
    return {
      props: { year, matches: [], players: [] },
    };
  }

  const players = R.pipe(
    matches,
    collectPlayers,
    R.sortBy((player) => -player.mp)
  );

  const stat = collectTeamStat(matches);

  return {
    props: {
      year,
      matches: R.map(matches, getMatchItem),
      players,
      stat,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: R.pipe(
      R.range(MIN_YEAR, MAX_YEAR + 1),
      R.map((year) => ({ params: { year: year.toString() } }))
    ),
    fallback: false,
  };
}

type Props = {
  matches: MatchItem[];
  year: string;
  stat: TeamStat;
};

// SMELL: copied from Pages/Team
function statPhrase(stat: TeamStat) {
  return `${pluralize("match", stat.mp, true)} (${stat.mw}W ${stat.md}D ${
    stat.ml
  }L), goals: ${stat.gf}-${stat.ga}`;
}

export default function DateRangeIndexPage({ year, matches, stat }: Props) {
  return (
    <Page title={["Matches", year]}>
      <MatchesNav year={parseInt(year, 10)} />
      <MatchesHeader year={year} />
      <p className="mb-4">{statPhrase(stat)}</p>
      <Fixtures matches={matches} />
    </Page>
  );
}
