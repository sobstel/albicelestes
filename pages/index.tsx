import React from "react";
import * as R from "remeda";
import { fetchMatches } from "data";
import { getMatchItem } from "helpers";
import { MatchItem } from "types";
import { MAX_YEAR } from "config";
import { Page, Header } from "components/layout";
import MatchList from "components/MatchList";
import YearNav from "components/YearNav";

type Props = {
  matches: MatchItem[];
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const matches = R.pipe(fetchMatches(), R.reverse(), R.take(10));

  return {
    props: {
      matches: R.map(matches, getMatchItem),
    },
  };
}

export default function YearIndexPage({ matches }: Props) {
  return (
    <Page title={["Matches"]}>
      <YearNav year={MAX_YEAR} isYearInactive />
      <Header
        top
        text="Argentina"
        nav={[
          { text: "Recent", href: `/` },
          { text: "All", href: `/all` },
        ]}
      />
      <MatchList matches={matches} />
    </Page>
  );
}
