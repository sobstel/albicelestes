import { flatten, flow, forEach, last, map, sortBy, tap } from "lodash";
import Section from "../layout/Section";
import PlayerName from "../PlayerName";

function indexGoals(matchGoals) {
  return forEach(matchGoals, (goals, teamIndex) => {
    forEach(goals, goal => (goal.teamIndex = teamIndex));
  });
}

function addScores(goals) {
  const currentScore = [0, 0];
  return map(goals, goal => {
    currentScore[goal.teamIndex] += 1;
    goal.score = [...currentScore];
    return goal;
  });
}

export default ({ match }) => {
  const goals = flow(
    indexGoals,
    flatten,
    goals => sortBy(goals, "min"),
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
