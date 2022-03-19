import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, useLoaderData } from "remix";

import { Header, Page } from "~/components/layout";
import MatchList from "~/components/MatchList";
import { fetchMatches } from "~/data";
import { collectTeamStat, findTeamName } from "~/helpers";
import { getMatchItem, getTeamSlug } from "~/helpers";
import { TeamStat } from "~/types";

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

// function generateDescription({
//   name,
//   stat,
//   matches,
// }: Pick<Props, "name" | "stat" | "matches">) {
//   const lastMatch = R.last(matches);
//   return R.compact([
//     `Argentina football national team ${pluralize(
//       "match",
//       stat.mp
//     )} against ${name}`,
//     statPhrase(stat),
//     lastMatch &&
//       [
//         getMatchDate(lastMatch, { withYear: true }),
//         ": ",
//         getMatchTeams(lastMatch),
//         " ",
//         getMatchScore(lastMatch),
//         ` (${lastMatch.competition})...`,
//       ].join(""),
//   ]).join(". ");
// }

export default function TeamPage() {
  const { name, matches, stat } = useLoaderData<LoaderData>();
  const title = `Argentina v ${name}`;
  return (
    <Page title={[title, "Head-to-Head"]}>
      <Header text={title} top />
      <p className="mb-4">{statPhrase(stat)}</p>
      <MatchList matches={matches} />
    </Page>
  );
}
