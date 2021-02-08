import React from "react";
import MatchList from "components/MatchList";
import { Block, Header } from "components/layout";
import { LinkAnchor } from "components/layout";
import { Match, MatchItem } from "types";
import { TEAM_SLUG } from "config";

type Props = {
  match: Pick<Match, "date" | "teams">;
  prevMatch?: MatchItem;
  nextMatch?: MatchItem;
};

export default function SeeAlso({ match, prevMatch, nextMatch }: Props) {
  const otherTeam = match.teams.find((team) => team.slug !== TEAM_SLUG);
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

      {prevMatch && <MatchList title="Previous match" matches={[prevMatch]} />}
      {nextMatch && <MatchList title="Next match" matches={[nextMatch]} />}
    </>
  );
}
