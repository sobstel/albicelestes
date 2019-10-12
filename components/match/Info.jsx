import { formatDate, formatTime } from "../../lib/date";

export default ({ match }) => {
  return (
    <p>
      {formatDate(match.date, match.time, true)},{" "}
      {formatTime(match.date, match.time)}
      <span> · </span>
      {match.round_name}
    </p>
  );
};
