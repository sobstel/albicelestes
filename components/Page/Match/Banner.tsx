import React from "react";
import { matchDate } from "helpers";
import Section from "components/Layout/Section";
import { Match } from "types";
import { matchScore } from "helpers";

type Props = {
  match: Pick<
    Match,
    "date" | "competition" | "teams" | "score" | "pen" | "suspended"
  >;
};

export default function Banner({ match }: Props) {
  return (
    <Section title={matchScore(match)} top>
      {matchDate(match, { withYear: true })}, {match.competition}
    </Section>
  );
}
