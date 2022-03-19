import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, useLoaderData } from "remix";

import { Page } from "~/components/layout";
import PlayerCatalogNav from "~/components/PlayerCatalogNav";
import PlayerList from "~/components/PlayerList";
import { fetchMatches } from "~/data";
import { collectPlayers, sortByMatchesPlayed } from "~/helpers";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData() {
  const players = R.pipe(
    fetchMatches(),
    collectPlayers,
    R.filter((player) => player.mp >= 50),
    sortByMatchesPlayed
  );

  return { players };
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>(await getLoaderData());
};

export default function PlayerIndexPage() {
  const { players } = useLoaderData<LoaderData>();
  return (
    <Page title={["Players"]}>
      <PlayerCatalogNav />
      <PlayerList players={players} />
    </Page>
  );
}
