import { formatDate, formatTime } from "../../lib/date";
import Section from "../layout/Section";

export default ({ match }) => {
  return (
    <Section
      title={`${match.home_name} - ${match.away_name} ${match.ft &&
        match.ft.join(":")}`}
    >
      {formatDate(match.date, match.time, true)},{" "}
      {formatTime(match.date, match.time)}
      {", "}
      {match.round_name}
    </Section>
  );
};
