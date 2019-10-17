import Section from "../layout/Section";

const eventLabel = event => {
  if (event.code === "M") {
    return "X";
  }
  if (event.code === "G") {
    return `${event.score[0]}:${event.score[1]}`;
  }
  return "";
};

export default ({ match }) => {
  if (!match.penalty_shootout || match.penalty_shootout.length === 0) {
    return null;
  }

  return (
    <Section title="Penalty shootout">
      {match.penalty_shootout.map(event => (
        <>
          {event.name} ({eventLabel(event)}),
        </>
      ))}
    </Section>
  );
};
