import React from "react";
import * as R from "remeda";
import { fetchMatches } from "data";
import { collectPlayers, sortByMatchesPlayed } from "helpers";
import Page, { Props } from "components/Page/Players";

export default function PageContainer(props: Props) {
  return <Page {...props} />;
}

export async function getStaticProps() {
  const players = R.pipe(
    fetchMatches(),
    collectPlayers,
    R.filter((player) => player.mp >= 50),
    sortByMatchesPlayed
  );

  return { props: { players } };
}
