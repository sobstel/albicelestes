import React from "react";
import {
  getMatchDate,
  getMatchYear,
  getMatchScore,
  getMatchSlug,
} from "helpers";
import { MatchItem } from "types";
import { fetchTeamInflections, fetchCompetitionInflections } from "data";
import Section from "./Layout/Section";
import Link from "./Layout/Link";

export type FixtureMatch = MatchItem;

type Props = {
  title?: string;
  matches: FixtureMatch[];
};

const competitionInflections = fetchCompetitionInflections();
const teamInflections = fetchTeamInflections();

export default function Fixtures({ title, matches }: Props) {
  if (matches.length === 0) return null;

  return (
    <Section title={title}>
      <div className="max-w-full overflow-hidden">
        <table>
          {matches.map((match) => (
            <tr key={`${getMatchYear(match)}-${getMatchSlug(match)}`}>
              <td className="whitespace-nowrap align-top pr-4">
                {getMatchDate(match, { withYear: true })}
              </td>
              <td className="whitespace-nowrap align-top pr-4">
                <Link
                  href={`/matches/${getMatchYear(match)}/${getMatchSlug(
                    match
                  )}`}
                >{`${
                  teamInflections[match.teams[0].name] ?? match.teams[0].name
                } - ${
                  teamInflections[match.teams[1].name] ?? match.teams[1].name
                }`}</Link>
              </td>
              <td className="whitespace-nowrap align-top pr-4">
                {getMatchScore(match, { withTeams: false, short: true })}
              </td>
              <td className="whitespace-nowrap align-top">
                <em>
                  {competitionInflections[match.competition] ??
                    match.competition}
                </em>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </Section>
  );
}
