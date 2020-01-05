import { flatten, flow, map, sortBy, toNumber } from "lodash";
import Section from "components/layout/Section";
import PlayerName from "../PlayerName";

type Props = { match: Match };
type IndexedGoal = Goal & { teamIndex: number };
type GoalWithScore = Goal & { score: Score };

function indexGoals(
  matchGoals: [Goal[], Goal[]]
): [IndexedGoal[], IndexedGoal[]] {
  return [
    matchGoals[0].map(goal => ({ ...goal, teamIndex: 0 })),
    matchGoals[1].map(goal => ({ ...goal, teamIndex: 1 }))
  ];
}

function addScores(goals: IndexedGoal[]): GoalWithScore[] {
  const currentScore = [0, 0];
  return goals.map(goal => {
    currentScore[goal.teamIndex] += 1;
    return { ...goal, score: [currentScore[0], currentScore[1]] };
  });
}

export default ({ match }: Props) => {
  const goals = flow(
    indexGoals,
    flatten,
    goals => sortBy(goals, goal => toNumber(goal.min)),
    addScores
  )(match.goals);

  if (goals.length === 0) {
    return null;
  }

  const names = map(flatten(match.lineups), "name");

  return (
    <Section title="Goals">
      {goals.map((goal, index) => (
        <p key={index}>
          {goal.score.join(":")}{" "}
          <PlayerName name={goal.name} names={names} id={goal.id} />{" "}
          {goal.min && `${goal.min}'`}
          {goal.type !== "G" && ` [${goal.type}] `}
        </p>
      ))}
    </Section>
  );
};
