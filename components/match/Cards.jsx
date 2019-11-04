import { flatten, sortBy } from "lodash";
import { Fragment } from "react";
import Section from "../layout/Section";

export default ({ match }) => {
  const cards = sortBy(flatten(match.cards), 'min');

  if (cards.length === 0) {
    return null
  }

  return (
    <Section title="Cards">
      {cards.map((event, index) => (
        <Fragment key={index}>
          {index > 0 && ", "}
          {event.name} {event.min && `${event.min}'`} {event.type && `(${event.type})`}
        </Fragment>
      ))}
    </Section>
  );
};
