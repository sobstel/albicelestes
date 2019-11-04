import slugify from "slugify";
import Link from "next/link";
import Section from "../layout/Section";

function PlayerName({ event, match, team_index }) {
  if (match.teams[team_index].slug === "argentina") {
    const { id } = event;
    const slug = slugify(event.name, { lower: true });
    return (
      <Link href={`/players/${slug}/${id}`} prefetch={false}>
        <a className="text-blue-600 hover:text-blue-400">{event.name}</a>
      </Link>
    );
  }

  return event.name;
}

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
      {lineups.map((lineup, team_index) => (
        lineup.length > 0 && (
          <Section key={team_index}
            title={`${teams[team_index].name}${coachName(coaches, team_index)}`}
          >
            {lineup.map((event, index) => (
              <span key={`${team_index}-${index}`}>
                {!event.in && (
                  <>
                    {index > 0 && ", "}
                    <PlayerName event={event} match={match} team_index={team_index} />
                  </>
                )}
                {event.in && (
                  <>
                    {` (${event.in}' `}
                    <PlayerName event={event} match={match} team_index={team_index} />
                    {`)`}
                  </>
                )}
              </span>
            ))}
          </Section>
        )
      ))}
    </div>
  );
};
