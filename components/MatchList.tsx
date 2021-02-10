import React from "react";
import useBreakpoint from "hooks/useBreakpoint";
import {
  getMatchDate,
  getMatchOtherTeam,
  getMatchYear,
  getMatchScore,
  getMatchSlug,
} from "helpers";
import { MatchItem } from "types";
import { fetchTeamInflections, fetchCompetitionInflections } from "data";
import { Block, LinkAnchor } from "./layout";
import getMatchTeamIndex from "helpers/getMatchTeamIndex";

const competitionInflections = fetchCompetitionInflections();
const teamInflections = fetchTeamInflections();

const SmallTable = ({ matches }: Props) => (
  <table>
    <tbody>
      {matches.map((match) => {
        const myTeamIndex = getMatchTeamIndex(match);
        const otherTeam = getMatchOtherTeam(match);
        const isMyTeamHome = myTeamIndex === 0;

        let scoreMatch = { ...match };
        // reverse score when only other team name is displayed
        if (!isMyTeamHome) {
          scoreMatch = {
            ...match,
            teams: [match.teams[1], match.teams[0]],
            score: [match.score[1], match.score[0]],
            pen: match.pen && [match.pen[1], match.pen[0]],
            result: match.result,
          };
        }

        return (
          <tr key={`${getMatchYear(match)}-${getMatchSlug(match)}`}>
            <td>{getMatchDate(match, { withYear: true })}</td>
            <td>
              <LinkAnchor
                href={`/${getMatchYear(match)}/${getMatchSlug(match)}`}
              >
                {[
                  teamInflections[otherTeam.name] ?? otherTeam.name,
                  isMyTeamHome ? "(H)" : "(A)",
                ].join(" ")}
              </LinkAnchor>
            </td>
            <td>{getMatchScore(scoreMatch, { short: true })}</td>
            <td>
              <em>
                {competitionInflections[match.competition] ?? match.competition}
              </em>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

const StandardTable = ({ matches }: Props) => (
  <table>
    <tbody>
      {matches.map((match) => (
        <tr key={`${getMatchYear(match)}-${getMatchSlug(match)}`}>
          <td>{getMatchDate(match, { withYear: true })}</td>
          <td>
            <LinkAnchor href={`/${getMatchYear(match)}/${getMatchSlug(match)}`}>
              {[
                teamInflections[match.teams[0].name] ?? match.teams[0].name,
                teamInflections[match.teams[1].name] ?? match.teams[1].name,
              ].join(" - ")}
            </LinkAnchor>
          </td>
          <td>{getMatchScore(match, { short: true })}</td>
          <td>
            <em>
              {competitionInflections[match.competition] ?? match.competition}
            </em>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

type Props = {
  matches: MatchItem[];
};

export default function MatchList({ matches }: Props) {
  if (matches.length === 0) return null;

  const isSmall = useBreakpoint("sm");

  let table: JSX.Element;
  if (isSmall) {
    table = <SmallTable matches={matches} />;
  } else {
    table = <StandardTable matches={matches} />;
  }

  return (
    <Block>
      <div className="max-w-full overflow-hidden">{table}</div>
    </Block>
  );
}
