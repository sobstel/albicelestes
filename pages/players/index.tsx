import React from "react";
import * as R from "remeda";
import { fetchMatches } from "data";
import { collectPlayers, sortByMatchesPlayed } from "helpers";
import { PlayerItem } from "types";
import { Page } from "components/layout";
import PlayerCatalogNav from "components/PlayerCatalogNav";
import PlayerList from "components/PlayerList";

export async function getStaticProps() {
  const players = R.pipe(
    fetchMatches(),
    collectPlayers,
    R.filter((player) => player.mp >= 50),
    sortByMatchesPlayed
  );

  return { props: { players } };
}

export type Props = {
  catalog?: string;
  players?: Array<PlayerItem>;
};

export default function PlayerIndexPage({ catalog, players }: Props) {
  const titleParts = ["Players"];
  if (catalog) {
    titleParts.push(catalog.toUpperCase());
  }

  return (
    <Page title={titleParts}>
      <PlayerCatalogNav catalog={catalog} />
      <PlayerList players={players} />
    </Page>
  );
}
