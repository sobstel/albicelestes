import { formatDate, formatTime } from "../../lib/date";
import Section from "../layout/Section";

export default ({ match }) => {
  const [homeTeam, awayTeam] = match.teams;
  return (
    <Section
      title={`${homeTeam.name} - ${awayTeam.name} ${
        match.score.join(":")
      }`}
    >
      {formatDate(match.date, true)}, {match.competition}
    </Section>
  );
};
