import React from "react";
import * as R from "remeda";
import { Fragment } from "react";
import { playersShortNames } from "helpers";
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

  const shortNames = R.pipe(
    match.lineups,
    R.flatten(),
    R.map((app) => app.name),
    playersShortNames
  );

  return (
    <Section title="Cards">
      {cards.map((card, index) => (
        <Fragment key={index}>
          {index > 0 && ", "}
          <PlayerName
            name={card.name}
            displayName={shortNames[card.name]}
            id={card.id}
          />{" "}
          {card.min && `${card.min}'`} {card.type && `(${card.type})`}
        </Fragment>
      ))}
    </Section>
  );
}
