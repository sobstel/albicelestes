import { Fragment } from "react";
import Section from "../layout/Section";

export default ({ match }) => {
  if (!match.cards || match.cards.length === 0) {
    return null;
  }

  return (
    <Section title="Cards">
      {match.cards.map((event, index) => (
        <Fragment key={index}>
          {index > 0 && ", "}
          {event.name} {event.min}&apos; ({event.code})
        </Fragment>
      ))}
    </Section>
  );
};
