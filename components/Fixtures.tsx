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
      <table>
        {matches.map((match) => (
          <tr key={`${getMatchYear(match)}-${getMatchSlug(match)}`}>
            <td className="whitespace-nowrap align-top pr-4">
              {getMatchDate(match, { withYear: true })}
            </td>
            <td className="whitespace-nowrap align-top pr-4">
              <Link
                href="/matches/[year]/[slug]"
                as={`/matches/${getMatchYear(match)}/${getMatchSlug(match)}`}
              >{`${match.teams[0].name} - ${match.teams[1].name}`}</Link>
            </td>
            <td className="align-top pr-4">
              {getMatchScore(match, { withTeams: false })}
            </td>
            <td className="align-top">
              <em>{match.competition}</em>
            </td>
          </tr>
        ))}
      </table>
    </Section>
  );
}
