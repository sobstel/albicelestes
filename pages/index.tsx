import React from "react";
import * as R from "remeda";
import { fetchMatches } from "data";
import { getMatchItem } from "helpers";
import { MatchItem } from "types";
import { MAX_YEAR } from "config";
import { Page, Header, LinkAnchor } from "components/layout";
import Fixtures from "components/Fixtures";
import MatchesNav from "components/MatchesNav";

type Props = {
  matches: MatchItem[];
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const matches = R.pipe(fetchMatches(), R.reverse(), R.take(25));

  return {
    props: {
      matches: R.map(matches, getMatchItem),
    },
  };
}

export default function YearIndexPage({ matches }: Props) {
  return (
    <Page title={["Matches"]}>
      <MatchesNav year={MAX_YEAR} isYearInactive />
      <Header top text="Argentina" />
      <Fixtures matches={matches} />
      <p>
        <LinkAnchor href="/all">Go to full match list...</LinkAnchor>
      </p>
    </Page>
  );
}
