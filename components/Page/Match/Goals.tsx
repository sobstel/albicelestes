import React from "react";
import * as R from "remeda";
import { indexEvents } from "functions";
import { TeamIndex } from "functions/indexEvents";
import { matchTeamIndex, playersShortNames } from "helpers";
import { Goal, Match } from "types";
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
    R.sortBy((goal) => parseInt(String(goal.min), 10)),
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
          {goal.score.join(":")}{" "}
          <PlayerName
            name={goal.name}
            displayName={shortNames[goal.name]}
            linkify={goal.teamIndex === myTeamIndex}
          />{" "}
          {goal.min && `${goal.min}'`}
          {goal.type !== "G" && ` [${goal.type}] `}
        </p>
      ))}
    </Section>
  );
}
