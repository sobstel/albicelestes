import Section from "../layout/Section";

export default ({ match }) => {
  if (!match.goals || match.goals.length === 0) {
    return null;
  }

  return (
    <Section title="Goals">
      {match.goals.map((goal, index) => (
        <p key={index}>
          {goal.score[0]}:{goal.score[1]}&nbsp;
          {goal.name} {goal.min}&apos;
          {goal.code !== "G" && ` [${goal.code}] `}
        </p>
      ))}
    </Section>
  );
};
