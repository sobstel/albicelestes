import Fixtures from "../../Fixtures";
import Section from "../../Layout/Section";
import Link from "../../Layout/Link";

type Props = {
  match: Match;
  prevMatch?: MatchItem;
  nextMatch?: MatchItem;
};

export default function SeeAlso({ match, prevMatch, nextMatch }: Props) {
  const otherTeam = match.teams.find((team) => team.slug !== "argentina");
  const year = match.date.slice(0, 4);

  return (
    <>
      <Section title="See also">
        <p>
          <Link
            href="/matches/[year]"
            as={`/matches/${year}`}
            title={`Argentina matches in ${year}`}
          >
            All matches in {year}
          </Link>
        </p>
        {otherTeam && otherTeam.slug && (
          <p>
            <Link
              href="/teams/[slug]"
              as={`/teams/${otherTeam.slug}`}
              title={`Argentina v ${otherTeam.name}`}
            >
              All matches against {otherTeam.name}
            </Link>
          </p>
        )}
      </Section>

      {prevMatch && <Fixtures title="Previous match" matches={[prevMatch]} />}
      {nextMatch && <Fixtures title="Next match" matches={[nextMatch]} />}
    </>
  );
}
