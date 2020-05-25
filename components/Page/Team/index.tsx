import * as R from "remeda";
import pluralize from "pluralize";
import React from "react";
import Fixtures from "components/Fixtures";
import Competitions from "components/Competitions";
import Layout from "components/Layout";
import Header from "components/Layout/Header";
import { matchDate, matchScore } from "helpers";
import { MatchItem, TeamStat } from "types";

export type Props = {
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
  stat,
  matches,
}: Pick<Props, "stat" | "matches">) {
  const lastMatch = R.last(matches);
  return R.compact([
    `All Argentina national team matches against ${name}`,
    statPhrase(stat),
    lastMatch &&
      `Latest match: ${matchDate(lastMatch, {
        withYear: true,
        uppercase: false,
      })} ${matchScore(lastMatch)}.`,
  ]).join(". ");
}

export default function TeamPage({
  slug,
  name,
  matches,
  competitions,
  stat,
}: Props) {
  const title = `Argentina v ${name}`;
  return (
    <Layout
      title={[title, "Head-to-Head"]}
      description={generateDescription({ stat, matches })}
      canonicalPath={`/teams/${slug}`}
    >
      <Header text={title} />
      <p className="mb-4">{statPhrase(stat)}</p>
      <Competitions names={competitions} />
      <Fixtures title="Matches" matches={matches} />
    </Layout>
  );
}
