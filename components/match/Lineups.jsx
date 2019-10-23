import slugify from "slugify";
import Link from "next/link";
import Section from "../layout/Section";

function PlayerName({ event, match, type }) {
  if (match[`${type}_name`] === "Argentina") {
    const id = event.person_id;
    const slug = slugify(event.name, { lower: true });
    return (
      <Link href={`/players/${slug}/${id}`}>
        <a className="text-blue-600 hover:text-blue-400">{event.name}</a>
      </Link>
    );
  }

  return event.name;
}

function coachName(match, type) {
  if (!match[type + "_coach"]) {
    return "";
  }

  return ` (${match[type + "_coach"].name})`;
}

export default ({ match }) => {
  return (
    <div>
      {["home", "away"].map(type => (
        <div key={type}>
          {match[`${type}_players`].length > 0 && (
            <Section
              title={`${match[type + "_name"]}${coachName(match, type)}`}
            >
              {match[`${type}_players`].map((event, index) => (
                <span key={`${type}-${index}`}>
                  {!event.in && (
                    <>
                      {index > 0 && ", "}
                      <PlayerName event={event} match={match} type={type} />
                    </>
                  )}
                  {event.in && (
                    <>
                      {` (${event.in}' `}
                      <PlayerName event={event} match={match} type={type} />
                      {`)`}
                    </>
                  )}
                </span>
              ))}
            </Section>
          )}
        </div>
      ))}
    </div>
  );
};
