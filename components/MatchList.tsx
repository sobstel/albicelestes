import React from "react";
import * as R from "remeda";
import {
  getMatchDate,
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

const Date = ({ match }: { match: MatchItem }) => {
  return <>{getMatchDate(match, { withYear: true })}</>;
};

const Teams = ({ match }: { match: MatchItem }) => {
  const myTeamIndex = getMatchTeamIndex(match);
  const isMyTeamHome = myTeamIndex === 0;

  return (
    <LinkAnchor href={`/${getMatchYear(match)}/${getMatchSlug(match)}`}>
      {isMyTeamHome ? (
        <>
          <span className="hidden md:inline">{match.teams[0].name} - </span>
          {teamInflections[match.teams[1].name] ?? match.teams[1].name}
        </>
      ) : (
        <>
          {teamInflections[match.teams[0].name] ?? match.teams[0].name}
          <span className="hidden md:inline"> - {match.teams[1].name}</span>
        </>
      )}
      <span className="inline md:hidden"> {isMyTeamHome ? "(H)" : "(A)"}</span>
    </LinkAnchor>
  );
};

const Score = ({ match }: { match: MatchItem }) => {
  const myTeamIndex = getMatchTeamIndex(match);
  const isMyTeamAway = myTeamIndex === 1;
  const score = getMatchScore(match, { short: true });

  if (isMyTeamAway) {
    // TODO: move to some getMatchScoreElements/Parts
    const regexp = /^(?<prefix>p\.)?(?<homeScore>\d+):(?<awayScore>\d+)/;
    const { prefix, homeScore, awayScore } = score.match(regexp)?.groups || {};
    return (
      <>
        {prefix}
        <span className="inline-flex flex-row-reverse md:flex-row">
          <span>{homeScore}</span>
          <span>:</span>
          <span>{awayScore}</span>
        </span>
      </>
    );
  }

  return <>{score}</>;
};

type Props = {
  matches: Array<MatchItem>;
};

export default function MatchList({ matches }: Props) {
  if (matches.length === 0) return null;

  const hasUnverifiedMatches = R.find(matches, (match) => !match.sources);

  return (
    <Block>
      <div className="max-w-full overflow-hidden">
        <table>
          <tbody>
            {matches.map((match) => (
              <tr key={`${getMatchYear(match)}-${getMatchSlug(match)}`}>
                <td>
                  <Date match={match} /> {!match.sources && <sup>*</sup>}
                </td>
                <td>
                  <Teams match={match} />
                </td>
                <td>
                  <Score match={match} />
                </td>
                <td>
                  <em>
                    {competitionInflections[match.competition] ??
                      match.competition}
                  </em>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasUnverifiedMatches && (
          <p className="mt-4 text-xs italic">
            <sup>*</sup> Data might not be fully accurate. It needs to be
            verified with reliable sources. Want to help? Contact me at
            przemek&#64;sobstel&#46;org.
          </p>
        )}
      </div>
    </Block>
  );
}
