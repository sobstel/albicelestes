import React from "react";
import * as R from "remeda";
import { playersShortNames } from "../../../helpers";
import Section from "../../Layout/Section";
import PlayerName from "../../PlayerName";

type Props = { match: Match };
type IndexedGoal = Goal & { teamIndex: number };
type GoalWithScore = Goal & { score: Score };

function indexGoals(
  matchGoals: [Goal[], Goal[]]
): [IndexedGoal[], IndexedGoal[]] {
  return [
    matchGoals[0].map((goal) => ({ ...goal, teamIndex: 0 })),
    matchGoals[1].map((goal) => ({ ...goal, teamIndex: 1 })),
  ];
}

function addScores(goals: IndexedGoal[]): GoalWithScore[] {
  const currentScore = [0, 0];
  return goals.map((goal) => {
    currentScore[goal.teamIndex] += 1;
    return { ...goal, score: [currentScore[0], currentScore[1]] };
  });
}

export default function Goals({ match }: Props) {
  const goals = R.pipe(
    match.goals,
    indexGoals,
    R.flatten(),
    R.sortBy((goal) => goal.min),
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

  return (
    <Section title="Goals">
      {goals.map((goal, index) => (
        <p key={index}>
          {goal.score.join(":")}{" "}
          <PlayerName
            name={goal.name}
            displayName={shortNames[goal.name]}
            id={goal.id}
          />{" "}
          {goal.min && `${goal.min}'`}
          {goal.type !== "G" && ` [${goal.type}] `}
        </p>
      ))}
    </Section>
  );
}
