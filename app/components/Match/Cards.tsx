import React, { Fragment } from "react";
import * as R from "remeda";
import { produceIndexedEvents } from "~/helpers";
import { getMatchTeamIndex, sortByMinute } from "~/helpers";
import { Match } from "~/types";
import { Block, Header } from "~/components/layout";
import PlayerName from "~/components/PlayerName";

type Props = { match: Pick<Match, "cards" | "lineups" | "teams"> };

export default function Cards({ match }: Props) {
  if (!match.cards) {
    return null;
  }

  const cards = R.pipe(
    match.cards,
    produceIndexedEvents,
    R.flatten(),
    sortByMinute
  );

  if (cards.length === 0) {
    return null;
  }

  const myTeamIndex = getMatchTeamIndex(match);

  return (
    <Block>
      <Header text="Cards" />
      {cards.map((card, index) => (
        <Fragment key={index}>
          {index > 0 && ", "}
          <PlayerName
            name={card.name}
            linkify={card.teamIndex === myTeamIndex}
          />{" "}
          {card.min && `${card.min}'`} {card.type && `(${card.type})`}
        </Fragment>
      ))}
    </Block>
  );
}
