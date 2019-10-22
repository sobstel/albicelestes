import Section from "../layout/Section";

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
                      {event.name}
                    </>
                  )}
                  {event.in && ` (${event.in}' ${event.name})`}
                </span>
              ))}
            </Section>
          )}
        </div>
      ))}
    </div>
  );
};
