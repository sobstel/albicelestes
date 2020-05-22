import React from "react";
import { matchDate, matchYear, matchScore, matchSlug } from "helpers";
import { MatchItem } from "types";
import Section from "./Layout/Section";
import Link from "./Layout/Link";

interface Props {
  title?: string;
  matches: MatchItem[];
}

export default function Fixtures({ title, matches }: Props) {
  if (matches.length === 0) return null;

  return (
    <Section title={title}>
      {matches.map((match) => (
        <div key={matchSlug(match)} className="mb-2">
          <p>
            {matchDate(match, { withYear: true })}, {match.competition}
          </p>
          <p>
            <Link
              href="/matches/[year]/[slug]"
              as={`/matches/${matchYear(match)}/${matchSlug(match)}`}
            >
              {matchScore(match)}
            </Link>
          </p>
        </div>
      ))}
    </Section>
  );
}

Fixtures.defaultProps = {
  matches: [],
};
