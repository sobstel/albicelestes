import { flatten, flow, sortBy } from "lodash";
import Section from "components/layout/Section";
import PlayerName from "../PlayerName";

interface Props {
  match: {
    goals: [Goal[], Goal[]];
  };
}

interface IndexedGoal extends Goal {
  teamIndex: number;
}

interface GoalWithScore extends Goal {
  score: SCORE;
}

function indexGoals(matchGoals: [Goal[], Goal[]]): IndexedGoal[][] {
  return matchGoals.map((goals, teamIndex) =>
    goals.map(goal => ({ ...goal, teamIndex }))
  );
}

function addScores(goals: IndexedGoal[]): GoalWithScore[] {
  const currentScore = [0, 0];
  return goals.map(goal => {
    currentScore[goal.teamIndex] += 1;
    return { ...goal, score: [...currentScore] as [number, number] };
  });
}

export default ({ match }: Props) => {
  const goals = flow(
    indexGoals,
    flatten,
    flattenedGoals => sortBy(flattenedGoals, "min"),
    addScores
  )(match.goals);

  if (goals.length === 0) {
    return null;
  }

  return (
    <Section title="Goals">
      {goals.map((goal, index) => (
        <p key={index}>
          {goal.score.join(":")}{" "}
          <PlayerName name={goal.name} match={match} id={goal.id} />{" "}
          {goal.min && `${goal.min}'`}
          {goal.type !== "G" && ` [${goal.type}] `}
        </p>
      ))}
    </Section>
  );
};
