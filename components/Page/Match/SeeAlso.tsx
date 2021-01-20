import React from "react";
import Fixtures, { FixtureMatch } from "components/Fixtures";
import Section from "components/Layout/Section";
import Link from "components/Layout/Link";
import { Match } from "types";

type Props = {
  match: Pick<Match, "date" | "teams">;
  prevMatch?: FixtureMatch;
  nextMatch?: FixtureMatch;
};

export default function SeeAlso({ match, prevMatch, nextMatch }: Props) {
  const otherTeam = match.teams.find((team) => team.slug !== "argentina");
  const year = match.date.slice(0, 4);

  return (
    <>
      <Section title="See also">
        <p>
          <Link href={`/${year}`} title={`Argentina matches in ${year}`}>
            All matches in {year}
          </Link>
        </p>
        {otherTeam && otherTeam.slug && (
          <p>
            <Link
              href={`/teams/${otherTeam.slug}`}
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
