import { flatten, sortBy } from "lodash";
import Section from "../layout/Section";

export default ({ match }) => {
  const goals = sortBy(flatten(match.goals), 'min');

  if (goals.length === 0) {
    return null
  }

  return (
    <Section title="Goals">
      {goals.map((goal, index) => (
        <p key={index}>
          {goal.name} {goal.min && `${goal.min}'`}
          {goal.type !== "G" && ` [${goal.type}] `}
        </p>
      ))}
    </Section>
  );
};
