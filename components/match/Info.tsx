import { formatDate } from "../../lib/date";
import Section from "../layout/Section";

interface Props {
  match: {
    teams: [{ name: string }, { name: string }];
    score: SCORE;
    date: string;
    competition: string;
  };
}

export default ({ match }: Props) => {
  const [homeTeam, awayTeam] = match.teams;
  return (
    <Section
      title={`${homeTeam.name} - ${awayTeam.name} ${match.score.join(":")}`}
    >
      {formatDate(match.date, true)}, {match.competition}
    </Section>
  );
};
