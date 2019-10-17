import Section from "../layout/Section";

export default ({ match }) => {
  return (
    <div>
      {["home", "away"].map(type => (
        <div key={type}>
          {match[`${type}_players`].length > 0 && (
            <Section
              title={`${match[type + "_name"]} (${
                match[type + "_coach"].name
              })`}
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
