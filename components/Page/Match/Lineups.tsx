import * as R from "remeda";
import Section from "../../Layout/Section";
import PlayerName from "../../PlayerName";
import { playersShortNames } from "../../../helpers";

function coachName(
  coaches: [MatchCoach, MatchCoach],
  teamIndex: number
): string {
  return coaches[teamIndex]?.name || "unknown";
}

type Props = {
  match: Match;
};

export default function Lineups({ match }: Props) {
  const { teams, lineups, coaches } = match;
  const shortNames = R.pipe(
    match.lineups,
    R.flatten(),
    R.map((app) => app.name),
    playersShortNames
  );

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
                        id={event.id}
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
                        id={event.id}
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
