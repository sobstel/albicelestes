import React from "react";
import Fixtures from "components/Fixtures";
import Competitions from "components/Competitions";
import Layout from "components/Layout";
import Header from "components/Layout/Header";
import { MatchItem, TeamStat } from "types";

export type Props = {
  slug: string;
  name: string;
  matches: MatchItem[];
  competitions: string[];
  stat: TeamStat;
};

function Stat({ stat: { mp, mw, md, ml, gf, ga } }: { stat: TeamStat }) {
  return (
    <p className="mb-4">
      {mp} matches ({mw}W {md}D {ml}L), goals: {gf}-{ga}
    </p>
  );
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
    <Layout title={[title, "Head-to-Head"]} canonicalPath={`/teams/${slug}`}>
      <Header text={title} />
      <Stat stat={stat} />
      <Competitions names={competitions} />
      <Fixtures title="Matches" matches={matches} />
    </Layout>
  );
}
