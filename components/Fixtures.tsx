import Link from "next/link";
import slugify from "slugify";
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
        const homeSlug = slugify(match.home_name, { lower: true });
        const awaySlug = slugify(match.away_name, { lower: true });
        const href = `/matches/${homeSlug}-${awaySlug}/${match.match_id}`;

        return (
          <Link key={match.match_id} href={href}>
            <a className="text-blue-600 hover:text-blue-400">
              <p>
                {formatDate(match.date, match.time)}{" "}
                {`${match.home_name} - ${match.away_name}`}
                {match.ended && ` ${match.ft[0]}:${match.ft[1]}`}
              </p>
            </a>
          </Link>
        );
      })}
    </Section>
  );
};

Fixtures.defaultProps = {
  matches: []
};

export default Fixtures;
