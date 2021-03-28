import React from "react";
import * as R from "remeda";
import { Block, Header } from "components/layout";
import PlayerName from "components/PlayerName";
import { Match, PenScore } from "types";
import { produceShortNames } from "helpers";

type Props = { match: Pick<Match, "penaltyShootout" | "teams"> };

function score(score: PenScore) {
  if (score === "x") {
    return "x";
  }
  return score.join(":");
}

export default function PenaltyShootout({ match }: Props) {
  const { penaltyShootout } = match;
  if (!penaltyShootout || penaltyShootout.length === 0) {
    return null;
  }

  const shortNames = R.pipe(
    penaltyShootout,
    R.map((pen) => pen.name),
    produceShortNames
  );

  return (
    <Block>
      <Header text="Penalty shootout" />
      {penaltyShootout.map((pen, index) => (
        <>
          {index > 0 && ", "}
          <PlayerName
            name={pen.name}
            displayName={shortNames[pen.name]}
            linkify={false}
          />{" "}
          ({score(pen.score)})
        </>
      ))}
    </Block>
  );
}
