import { flatten, sortBy } from "lodash";
import { Fragment } from "react";
import Section from "../layout/Section";
import PlayerName from "../PlayerName";

export default ({ match }) => {
  const cards = sortBy(flatten(match.cards), "min");

  if (cards.length === 0) {
    return null;
  }

  return (
    <Section title="Cards">
      {cards.map((card, index) => (
        <Fragment key={index}>
          {index > 0 && ", "}
          <PlayerName name={card.name} match={match} id={card.id} />{" "}
          {card.min && `${card.min}'`} {card.type && `(${card.type})`}
        </Fragment>
      ))}
    </Section>
  );
};
