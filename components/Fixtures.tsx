import Link from "next/link";
import slugify from "slugify";
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
      {matches.map(match => (
        <Link
          href={`/match?id=${match.match_id}`}
          as={`/match/${slugify(match.home_name, { lower: true })}-${slugify(
            match.away_name,
            { lower: true }
          )}/${match.match_id}`}
        >
          <p key={match.match_id}>
            <a className="cursor-pointer text-blue-600 hover:text-blue-400">
              {match.date} {match.home_name} - {match.away_name}{" "}
              {match.ended && `${match.ft[0]}:${match.ft[1]}`}
            </a>
          </p>
        </Link>
      ))}
    </Section>
  );
};

Fixtures.defaultProps = {
  matches: []
};

export default Fixtures;
