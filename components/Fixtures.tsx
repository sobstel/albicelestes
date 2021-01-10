import React from "react";
import {
  getMatchDate,
  getMatchYear,
  getMatchScore,
  getMatchSlug,
} from "helpers";
import { MatchItem } from "types";
import Section from "./Layout/Section";
import Link from "./Layout/Link";

export type FixtureMatch = MatchItem;

type Props = {
  title?: string;
  matches: FixtureMatch[];
};

export default function Fixtures({ title, matches }: Props) {
  if (matches.length === 0) return null;

  return (
    <Section title={title}>
      {matches.map((match) => (
        <div
          key={`${getMatchYear(match)}-${getMatchSlug(match)}`}
          className="mb-2"
        >
          <p>
            {getMatchDate(match, { withYear: true })}, {match.competition}
          </p>
          <p>
            <Link
              href="/matches/[year]/[slug]"
              as={`/matches/${getMatchYear(match)}/${getMatchSlug(match)}`}
            >
              {getMatchScore(match)}
            </Link>
          </p>
        </div>
      ))}
    </Section>
  );
}
