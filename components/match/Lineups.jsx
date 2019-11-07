import Section from "../layout/Section";
import PlayerName from "../PlayerName";

function coachName(coaches, team_index) {
  if (!coaches[team_index]) {
    return "";
  }

  return ` (${coaches[team_index].name})`;
}

export default ({ match }) => {
  const { teams, lineups, coaches } = match;
  return (
    <div>
      {lineups.map(
        (lineup, team_index) =>
          lineup.length > 0 && (
            <Section
              key={team_index}
              title={`${teams[team_index].name}${coachName(
                coaches,
                team_index
              )}`}
            >
              {lineup.map((event, index) => (
                <span key={`${team_index}-${index}`}>
                  {!event.in && (
                    <>
                      {index > 0 && ", "}
                      <PlayerName
                        name={event.name}
                        match={match}
                        id={event.id}
                      />
                    </>
                  )}
                  {event.in && (
                    <>
                      {` (${event.in}' `}
                      <PlayerName
                        name={event.name}
                        match={match}
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
};
