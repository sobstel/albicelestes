import * as R from "remeda";
import { Fragment } from "react";
import Section from "components/Layout/Section";
import PlayerName from "components/PlayerName";

type Props = { match: Match };

export default function Cards({ match }: Props) {
  const cards = R.pipe(
    match.cards,
    R.flatten(),
    R.sortBy((card) => card.min)
  );

  if (cards.length === 0) {
    return null;
  }

  const names = R.pipe(
    match.lineups,
    R.flatten(),
    R.map((app) => app.name)
  );

  return (
    <Section title="Cards">
      {cards.map((card, index) => (
        <Fragment key={index}>
          {index > 0 && ", "}
          <PlayerName name={card.name} names={names} id={card.id} />{" "}
          {card.min && `${card.min}'`} {card.type && `(${card.type})`}
        </Fragment>
      ))}
    </Section>
  );
}
