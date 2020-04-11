import React from "react";
import * as R from "remeda";
import { matchDate } from "helpers";
import Section from "components/Layout/Section";

type Props = {
  match: MatchItem;
};

export default function Score({ match }: Props) {
  const [homeTeam, awayTeam] = match.teams;

  const teams = `${homeTeam.name} - ${awayTeam.name}`;
  const score = match.score.join(":");
  const pen = match.pen && `p.${match.pen.join(":")}`;
  const title = R.compact([teams, score, pen]).join(" ");

  return (
    <Section title={title}>
      {matchDate(match, { withYear: true })}, {match.competition}
    </Section>
  );
}
