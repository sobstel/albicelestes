import React from "react";

import { Block, Header } from "~/components/layout";
import { LinkAnchor } from "~/components/layout";
import MatchList from "~/components/MatchList";
import { getMatchOtherTeam, getMatchYear, getTeamSlug } from "~/helpers";
import { Match, MatchItem } from "~/types";

type Props = {
  match: Pick<Match, "date" | "teams">;
  prevMatch?: MatchItem;
  nextMatch?: MatchItem;
};

export default function SeeAlso({ match, prevMatch, nextMatch }: Props) {
  const year = getMatchYear(match);
  const otherTeam = getMatchOtherTeam(match);

  return (
    <>
      <Block>
        <Header text="See also" />
        <p>
          <LinkAnchor href={`/${year}`} title={`Argentina matches in ${year}`}>
            All matches in {parseInt(String(parseInt(year) / 10))}0s
          </LinkAnchor>
        </p>
        <p>
          <LinkAnchor
            href={`/rivals/${getTeamSlug(otherTeam)}`}
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
