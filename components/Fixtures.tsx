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
      {matches.map(match => {
        const matchLink = `/match/${slugify(match.home_name, {
          lower: true
        })}-${slugify(match.away_name, { lower: true })}/${match.match_id}`;

        return (
          <Link
            key={match.match_id}
            href={`/match?id=${match.match_id}`}
            as={matchLink}
          >
            <a className="text-blue-600 hover:text-blue-400">
              <p>
                {match.date} {match.home_name} - {match.away_name}{" "}
                {match.ended && `${match.ft[0]}:${match.ft[1]}`}
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
