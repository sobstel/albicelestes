import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";

import PlayerCatalogNav from "~/components/PlayerCatalogNav";
import PlayerList from "~/components/PlayerList";
import { fetchMatches } from "~/data";
import { collectPlayers, sortByMatchesPlayed } from "~/helpers";
import { seoTitle } from "~/utility";

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

export const meta: MetaFunction = () => {
  return { title: seoTitle(["Players"]) };
};

export default function PlayerIndexPage() {
  const { players } = useLoaderData<LoaderData>();
  return (
    <>
      <PlayerCatalogNav />
      <PlayerList players={players} />
    </>
  );
}
