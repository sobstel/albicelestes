import * as R from "remeda";
import pluralize from "pluralize";
import React from "react";
import { fetchMatches } from "data";
import { findTeamName, collectTeams, collectTeamStat } from "helpers";
import {
  getMatchDate,
  getMatchScore,
  getMatchItem,
  getTeamSlug,
} from "helpers";
import { MatchItem, TeamStat } from "types";
import { Page, Header } from "components/layout";
import Fixtures from "components/Fixtures";

type Context = { params: { slug: string } };

export async function getStaticProps(context: Context) {
  const { slug } = context.params;

  const matches = R.pipe(
    fetchMatches(),
    R.filter(
      (match) => !!R.find(match.teams, (team) => getTeamSlug(team) === slug)
    )
  );
  const name = findTeamName(matches, slug);
  const stat = collectTeamStat(matches);

  return {
    props: {
      slug,
      name,
      matches: matches.map(getMatchItem),
      stat,
    },
  };
}

export async function getStaticPaths() {
  const paths = R.pipe(
    fetchMatches(),
    collectTeams,
    R.map((team) => ({ params: { slug: team.slug } }))
  );

  return { paths, fallback: false };
}

type Props = {
  slug: string;
  name: string;
  matches: MatchItem[];
  competitions: string[];
  stat: TeamStat;
};

function statPhrase(stat: TeamStat) {
  return `${pluralize("match", stat.mp, true)} (${stat.mw}W ${stat.md}D ${
    stat.ml
  }L), goals: ${stat.gf}-${stat.ga}`;
}

function generateDescription({
  name,
  stat,
  matches,
}: Pick<Props, "name" | "stat" | "matches">) {
  const lastMatch = R.last(matches);
  return R.compact([
    `Argentina football national team ${pluralize(
      "match",
      stat.mp
    )} against ${name}`,
    statPhrase(stat),
    lastMatch &&
      [
        getMatchDate(lastMatch, { withYear: true }),
        ": ",
        getMatchScore(lastMatch),
        ` (${lastMatch.competition})...`,
      ].join(""),
  ]).join(". ");
}

export default function TeamPage({ name, matches, stat }: Props) {
  const title = `Argentina v ${name}`;
  return (
    <Page
      title={[title, "Head-to-Head"]}
      description={generateDescription({ name, stat, matches })}
    >
      <Header text={title} top />
      <p className="mb-4">{statPhrase(stat)}</p>
      <Fixtures matches={matches} />
    </Page>
  );
}
