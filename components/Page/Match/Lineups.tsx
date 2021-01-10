import React from "react";

import * as R from "remeda";
import Section from "components/Layout/Section";
import PlayerName from "components/PlayerName";
import { getMatchTeamIndex, produceShortNames } from "helpers";
import { Match, MatchCoach } from "types";

function coachName(
  coaches: [MatchCoach, MatchCoach],
  teamIndex: number
): string {
  return coaches[teamIndex]?.name || "unknown";
}

type Props = {
  match: Pick<Match, "teams" | "lineups" | "coaches">;
};

export default function Lineups({ match }: Props) {
  const { teams, lineups, coaches } = match;
  const shortNames = R.pipe(
    match.lineups,
    R.flatten(),
    R.map((app) => app.name),
    produceShortNames
  );

  const myTeamIndex = getMatchTeamIndex(match);

  return (
    <div>
      {lineups.map(
        (lineup, teamIndex) =>
          lineup.length > 0 && (
            <Section
              key={teamIndex}
              title={`${teams[teamIndex].name} (${coachName(
                coaches,
                teamIndex
              )})`}
            >
              {lineup.map((event, index) => (
                <span key={`${teamIndex}-${index}`}>
                  {event.in === undefined && (
                    <>
                      {index > 0 && ", "}
                      <PlayerName
                        name={event.name}
                        displayName={shortNames[event.name]}
                        linkify={teamIndex === myTeamIndex}
                      />
                    </>
                  )}
                  {event.in !== undefined && (
                    <>
                      {` (`}
                      {event.in && `${event.in}' `}
                      <PlayerName
                        name={event.name}
                        displayName={shortNames[event.name]}
                        linkify={teamIndex === myTeamIndex}
                      />
                      {`)`}
                    </>
                  )}
                </span>
              ))}
            </Section>
          )
      )}
    </div>
  );
}
