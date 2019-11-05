import slugify from "slugify";
import Link from "next/link";
import { formatDate } from "../lib/date";
import Section from "./layout/Section";

interface Props {
  title: string;
  matches: any[];
}

const Fixtures = ({ title, matches }: Props) => {
  if (matches.length === 0) {
    return null;
  }

  return (
    <Section title={title}>
      {matches.map(match => {
        const [homeTeam, awayTeam] = match.teams;
        const homeSlug = homeTeam.slug || slugify(homeTeam.name, { lower: true });
        const awaySlug = awayTeam.slug || slugify(awayTeam.name, { lower: true });
        const matchYear = match.date.substring(0, 4);
        const href = `/archive/${matchYear}/${homeSlug}-${awaySlug}/${match.id}`;

        return (
          <Link key={match.id} href={href} prefetch={false}>
            <a className="block text-blue-600 hover:text-blue-400">
              {formatDate(match.date)}{' '}
              {homeTeam.name} - {awayTeam.name}{' '}
              {match.score.join(":")}
            </a>
          </Link>
        );
      })}
    </Section>
  );
};

Fixtures.defaultProps = {
  matches: [],
};

export default Fixtures;
