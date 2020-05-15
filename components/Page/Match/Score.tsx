import React from "react";
import { matchDate } from "helpers";
import Section from "components/Layout/Section";
import { MatchItem } from "types";
import { matchScore } from "helpers";

type Props = {
  match: MatchItem;
};

export default function Score({ match }: Props) {
  return (
    <Section title={matchScore(match)}>
      {matchDate(match, { withYear: true })}, {match.competition}
    </Section>
  );
}
