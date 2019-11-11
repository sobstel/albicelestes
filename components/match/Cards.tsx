import { flatten, flow, sortBy } from "lodash";
import { Fragment } from "react";
import Section from "components/layout/Section";
import PlayerName from "../PlayerName";

interface Props {
  match: {
    cards: [Card[], Card[]];
  };
}

export default ({ match }: Props) => {
  const cards = flow(
    flatten,
    flattenedCards => sortBy(flattenedCards, "min")
  )(match.cards);

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
