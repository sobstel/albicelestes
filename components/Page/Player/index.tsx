import * as R from "remeda";
import React from "react";
import pluralize from "pluralize";
import { MatchItem, PlayerInfo, PlayerStat } from "types";
import {
  getMatchDate,
  getMatchScore,
  getPlayerCatalog,
  getPlayerSlug,
} from "helpers";
import Layout from "components/Layout";
import Header from "components/Layout/Header";
import Fixtures from "components/Fixtures";
import Competitions from "components/Competitions";
import Info from "./Info";

export type Props = {
  slug: string;
  name: string;
  stat: PlayerStat;
  competitions: string[];
  matches: MatchItem[];
  info: PlayerInfo;
};

function statPhrase({ mp, si, so, g, yc, rc }: PlayerStat) {
  return R.compact([
    pluralize("match", mp, true),
    `(${so} out, ${si} in)`,
    pluralize("goal", g, true),
    yc > 0 && `${yc}Y`,
    rc > 0 && `${rc}R`,
  ]).join(" ");
}

function generateDescription({
  name,
  stat,
  matches,
}: Pick<Props, "name" | "stat" | "matches">) {
  const lastMatch = R.last(matches);
  return [
    `${name} matches played for Argentina football national team`,
    statPhrase(stat),
    lastMatch &&
      [
        getMatchDate(lastMatch, { withYear: true }),
        ": ",
        getMatchScore(lastMatch),
        ` (${lastMatch.competition})...`,
      ].join(""),
  ].join(". ");
}

export default function PlayerPage({
  name,
  stat,
  competitions,
  matches,
  info,
}: Props) {
  return (
    <Layout
      title={[name]}
      description={generateDescription({ name, stat, matches })}
    >
      <Header text={name} top />
      <p className="mb-4">{statPhrase(stat)}</p>
      <Competitions names={competitions} />
      <Fixtures title="Matches" matches={matches} />
      <Info info={info} />
    </Layout>
  );
}
