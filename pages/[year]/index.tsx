import React from "react";
import pluralize from "pluralize";
import * as R from "remeda";
import { MIN_YEAR, MAX_YEAR } from "config";
import { fetchMatches } from "data";
import { collectTeamStat, getMatchItem, getMatchYear } from "helpers";
import { MatchItem, TeamStat } from "types";
import Fixtures from "components/Fixtures";
import { Page, Header } from "components/layout";
import YearHeader from "components/YearHeader";
import YearNav from "components/YearNav";

const ALL = "all" as const;

type Context = { params: { year: string } };

export async function getStaticProps(context: Context) {
  // TODO: validate year and show 404 on invalid
  const { year } = context.params;

  if (year === ALL) {
    return {
      props: { year: ALL, matches: R.reverse(fetchMatches()), stat: null },
    };
  }

  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => getMatchYear(match) === year),
    R.reverse()
  );

  const stat = matches.length && collectTeamStat(matches);

  return {
    props: {
      year,
      matches: R.map(matches, getMatchItem),
      stat,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: R.pipe(
      R.range(MIN_YEAR, MAX_YEAR + 1),
      R.map((year) => ({ params: { year: year.toString() } })),
      R.concat([{ params: { year: ALL } }])
    ),
    fallback: false,
  };
}

type Props = {
  matches: MatchItem[];
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
  const isAll = year === ALL;
  return (
    <Page title={["Matches", year]}>
      {isAll ? (
        <>
          <YearNav year={MAX_YEAR} isYearInactive />
          <Header
            top
            text="Argentina"
            nav={[
              { text: "Recent", href: `/` },
              { text: "All", href: `/all` },
            ]}
          />
        </>
      ) : (
        <>
          <YearNav year={parseInt(year, 10)} />
          <YearHeader year={year} />
          {stat && <p className="mb-4">{statPhrase(stat)}</p>}
        </>
      )}
      <Fixtures matches={matches} />
    </Page>
  );
}
