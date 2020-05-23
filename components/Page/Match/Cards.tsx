import React from "react";
import * as R from "remeda";
import { Fragment } from "react";
import { matchTeamIndex, playersShortNames } from "helpers";
import { Card, Match } from "types";
import Section from "components/Layout/Section";
import PlayerName from "components/PlayerName";

type Props = { match: Match };
type IndexedCard = Card & { teamIndex: number };

function indexCards(
  matchCards: [Card[], Card[]]
): [IndexedCard[], IndexedCard[]] {
  return [
    matchCards[0].map((card) => ({ ...card, teamIndex: 0 })),
    matchCards[1].map((card) => ({ ...card, teamIndex: 1 })),
  ];
}

export default function Cards({ match }: Props) {
  const cards = R.pipe(
    match.cards,
    indexCards,
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

  const myTeamIndex = matchTeamIndex(match);

  return (
    <Section title="Cards">
      {cards.map((card, index) => (
        <Fragment key={index}>
          {index > 0 && ", "}
          <PlayerName
            name={card.name}
            displayName={shortNames[card.name]}
            linkify={card.teamIndex === myTeamIndex}
          />{" "}
          {card.min && `${card.min}'`} {card.type && `(${card.type})`}
        </Fragment>
      ))}
    </Section>
  );
}
