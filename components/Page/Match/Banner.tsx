import React from "react";
import { getMatchDate, getMatchScore } from "helpers";
import Section from "components/Layout/Section";
import { Match } from "types";

type Props = {
  match: Pick<
    Match,
    "date" | "competition" | "teams" | "score" | "pen" | "result"
  >;
};

export default function Banner({ match }: Props) {
  return (
    <Section title={getMatchScore(match)} top>
      {getMatchDate(match, { withYear: true })}, {match.competition}
    </Section>
  );
}
