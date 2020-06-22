import React from "react";

import * as R from "remeda";
import Section from "components/Layout/Section";
import PlayerName from "components/PlayerName";
import { MatchInfo, PenScore } from "types";
import { playersShortNames } from "helpers";

type Props = { matchInfo: Pick<MatchInfo, "penaltyShootout"> };

function score(score: PenScore) {
  if (score === "x") {
    return "x";
  }
  return score.join(":");
}

export default function PenaltyShootout({ matchInfo }: Props) {
  const { penaltyShootout } = matchInfo;
  if (!penaltyShootout || penaltyShootout.length === 0) {
    return null;
  }

  const shortNames = R.pipe(
    penaltyShootout,
    R.map((pen) => pen.name),
    playersShortNames
  );

  return (
    <Section title="Penalty shootout">
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
    </Section>
  );
}
