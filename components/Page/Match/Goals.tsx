import React from "react";
import * as R from "remeda";
import { indexEvents } from "functions";
import { TeamIndex } from "functions/indexEvents";
import { matchTeamIndex, playersShortNames } from "helpers";
import { Goal, Match } from "types";
import { xor } from "utility";
import Section from "components/Layout/Section";
import PlayerName from "components/PlayerName";

export type Props = { match: Pick<Match, "goals" | "lineups" | "teams"> };

function addScores(goals: (Goal & TeamIndex)[]) {
  const currentScore = [0, 0];
  return goals.map((goal) => {
    currentScore[goal.teamIndex] += 1;
    return { ...goal, score: [currentScore[0], currentScore[1]] };
  });
}

export default function Goals({ match }: Props) {
  const goals = R.pipe(
    match.goals,
    indexEvents,
    R.flatten(),
    R.sortBy((goal) => {
      if (!goal.min) return null;
      // 50 => 050+000, 90+2 => 090+002, 120+1 => 120+001
      return String(goal.min)
        .split("+")
        .map((part) => part.padStart(3, "0"))
        .join("+");
    }),
    addScores
  );

  if (goals.length === 0) {
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
    <Section title="Goals">
      {goals.map((goal, index) => (
        <p key={index}>
          {goal.min && `${goal.score.join(":")} `}
          <PlayerName
            name={goal.name}
            displayName={shortNames[goal.name]}
            linkify={xor(goal.teamIndex === myTeamIndex, goal.type === "OG")}
          />
          {goal.min && ` ${goal.min}'`}
          {goal.type !== "G" && ` [${goal.type}]`}
        </p>
      ))}
    </Section>
  );
}
