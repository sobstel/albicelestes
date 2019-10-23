import Link from "next/link";
import slugify from "slugify";
import { formatDate } from "../lib/date";
import Section from "./layout/Section";

interface Props {
  title: string;
  matches: any[];
  isArchive?: boolean;
}

const Fixtures = ({ title, matches, isArchive }: Props) => {
  if (matches.length === 0) {
    return null;
  }

  return (
    <Section title={title}>
      {matches.map(match => {
        const homeSlug = slugify(match.home_name, { lower: true });
        const awaySlug = slugify(match.away_name, { lower: true });
        const matchYear = match.date.substring(0, 4);
        const basePath = isArchive ? `/archive/${matchYear}` : "/matches";
        const href = `${basePath}/${homeSlug}-${awaySlug}/${match.match_id}`;

        return (
          <Link key={match.match_id} href={href}>
            <a className="block text-blue-600 hover:text-blue-400">
              {formatDate(match.date, match.time)}{" "}
              {`${match.home_name} - ${match.away_name}`}
              {match.ended && ` ${match.ft[0]}:${match.ft[1]}`}
            </a>
          </Link>
        );
      })}
    </Section>
  );
};

Fixtures.defaultProps = {
  matches: [],
  isArchive: false
};

export default Fixtures;
