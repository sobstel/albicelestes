import React from "react";
import * as R from "remeda";

import { fetchCompetitionInflections, fetchTeamInflections } from "~/data";
import {
  getMatchDate,
  getMatchScore,
  getMatchSlug,
  getMatchYear,
} from "~/helpers";
import getMatchTeamIndex from "~/helpers/getMatchTeamIndex";
import { MatchItem } from "~/types";

import { Block, LinkAnchor } from "./layout";

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
    </LinkAnchor>
  );
};

const Score = ({ match }: { match: MatchItem }) => {
  const myTeamIndex = getMatchTeamIndex(match);
  const isMyTeamAway = myTeamIndex === 1;
  const score = getMatchScore(match);

  if (isMyTeamAway) {
    // TODO: move to some getMatchScoreElements/Parts
    const regexp =
      /^(?<homePen>\(\d+\))?(?<homeScore>\d+):(?<awayScore>\d+)(?<awayPen>\(\d+\))?$/;
    const { homePen, homeScore, awayScore, awayPen } =
      score.match(regexp)?.groups || {};
    return (
      <span className="inline-flex flex-row-reverse md:flex-row">
        <span>{homePen}</span>
        <span>{homeScore}</span>
        <span>:</span>
        <span>{awayScore}</span>
        <span>{awayPen}</span>
      </span>
    );
  }

  return <>{score}</>;
};

type Props = {
  matches: Array<MatchItem>;
};

export default function MatchList({ matches }: Props) {
  if (matches.length === 0) {
    return (
      <Block>
        <p>No matches found</p>
      </Block>
    );
  }

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
