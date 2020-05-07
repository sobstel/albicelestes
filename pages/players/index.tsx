import React from "react";
import * as R from "remeda";
import { fetchMatches } from "db";
import { collectPlayers } from "functions";
import Page, { Props } from "components/Page/Players";

export default function PageContainer(props: Props) {
  return <Page {...props} />;
}

export async function getStaticProps() {
  const players = R.pipe(
    fetchMatches(),
    collectPlayers,
    R.sortBy((player) => -player.mp),
    R.take(20)
  );

  return { props: { players } };
}
