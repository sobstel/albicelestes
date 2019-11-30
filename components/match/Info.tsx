import { compact } from "lodash";
import { formatDate } from "lib/date";
import Section from "components/layout/Section";

interface Props {
  match: {
    teams: [{ name: string }, { name: string }];
    score: Score;
    pen?: Score;
    date: string;
    competition: string;
  };
}

export default ({ match }: Props) => {
  const [homeTeam, awayTeam] = match.teams;

  const teams = `${homeTeam.name} - ${awayTeam.name}`;
  const score = match.score.join(":");
  const pen = match.pen && `p.${match.pen.join(":")}`;
  const title = compact([teams, score, pen]).join(" ");

  return (
    <Section title={title}>
      {formatDate(match.date, true)}, {match.competition}
    </Section>
  );
};
