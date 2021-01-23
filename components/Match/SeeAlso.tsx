import React from "react";
import Fixtures, { FixtureMatch } from "components/Fixtures";
import { Block, Header } from "components/layout";
import { LinkAnchor } from "components/layout";
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
      <Block>
        <Header text="See also" />
        <p>
          <LinkAnchor href={`/${year}`} title={`Argentina matches in ${year}`}>
            All matches in {year}
          </LinkAnchor>
        </p>
        {otherTeam && otherTeam.slug && (
          <p>
            <LinkAnchor
              href={`/teams/${otherTeam.slug}`}
              title={`Argentina v ${otherTeam.name}`}
            >
              All matches against {otherTeam.name}
            </LinkAnchor>
          </p>
        )}
      </Block>

      {prevMatch && <Fixtures title="Previous match" matches={[prevMatch]} />}
      {nextMatch && <Fixtures title="Next match" matches={[nextMatch]} />}
    </>
  );
}
