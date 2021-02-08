import React from "react";
import MatchList from "components/MatchList";
import { Block, Header } from "components/layout";
import { LinkAnchor } from "components/layout";
import { Match, MatchItem } from "types";
import { getMatchYear, getMatchTeamIndex } from "helpers";

type Props = {
  match: Pick<Match, "date" | "teams">;
  prevMatch?: MatchItem;
  nextMatch?: MatchItem;
};

export default function SeeAlso({ match, prevMatch, nextMatch }: Props) {
  const year = getMatchYear(match);
  const otherTeam = match.teams[1 - getMatchTeamIndex(match)];

  return (
    <>
      <Block>
        <Header text="See also" />
        <p>
          <LinkAnchor href={`/${year}`} title={`Argentina matches in ${year}`}>
            All matches in {year}
          </LinkAnchor>
        </p>
        <p>
          <LinkAnchor
            href={`/teams/${otherTeam.slug}`}
            title={`Argentina v ${otherTeam.name}`}
          >
            All matches against {otherTeam.name}
          </LinkAnchor>
        </p>
      </Block>

      {prevMatch && (
        <>
          <Header text="Previous match" />
          <MatchList matches={[prevMatch]} />
        </>
      )}
      {nextMatch && (
        <>
          <Header text="Next match" />
          <MatchList matches={[nextMatch]} />
        </>
      )}
    </>
  );
}
