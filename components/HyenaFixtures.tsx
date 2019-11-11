import { formatDate } from "lib/date";
import Section from "./layout/Section";

interface Props {
  title: string;
  matches: any[];
}

const HyenaFixtures = ({ title, matches }: Props) => {
  if (matches.length === 0) {
    return null;
  }

  return (
    <Section title={title}>
      {matches.map(match => {
        return (
          <p key={match.date}>
            {formatDate(match.date)} {`${match.home_name} - ${match.away_name}`}
            {match.ended && ` ${match.ft[0]}:${match.ft[1]}`}
          </p>
        );
      })}
    </Section>
  );
};

HyenaFixtures.defaultProps = {
  matches: []
};

export default HyenaFixtures;
