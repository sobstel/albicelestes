import React from "react";
import * as R from "remeda";
import { fetchMatches } from "data";
import { getMatchItem } from "helpers";
import { MatchItem } from "types";
import { Page, Header } from "components/layout";
import MatchList from "components/MatchList";
import YearNav from "components/YearNav";

type Props = {
  matches: Array<MatchItem>;
};

export async function getStaticProps(): Promise<{ props: Props }> {
  const matches = R.pipe(fetchMatches(), R.reverse(), R.take(10), R.reverse());

  return {
    props: {
      matches: R.map(matches, getMatchItem),
    },
  };
}

export default function YearIndexPage({ matches }: Props) {
  return (
    <Page title={["Argentina National Team Archive"]}>
      <YearNav />
      <Header top text="Recent matches" />
      <MatchList matches={matches} />
    </Page>
  );
}
