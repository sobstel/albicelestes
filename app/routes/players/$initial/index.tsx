import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import slugify from "slugify";

import PlayerList from "~/components/PlayerList";
import { fetchMatches } from "~/data";
import { collectPlayers, getPlayerInitial, getPlayerName } from "~/helpers";
import { seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { initial },
}: Parameters<LoaderFunction>[0]) {
  const players = R.pipe(
    fetchMatches(),
    collectPlayers,
    R.filter((player) => getPlayerInitial(player.name) === initial),
    R.sortBy((player) => {
      const playerName = getPlayerName(player.name);
      return slugify(
        [playerName.lastName, playerName.firstName, playerName.middleName].join(
          " "
        ),
        {
          lower: true,
        }
      );
    })
  );

  return {
    initial,
    players,
  };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

export const meta: MetaFunction = ({
  data: { initial },
}: {
  data: LoaderData;
}) => {
  const titleParts = ["Players", initial ? initial.toUpperCase() : undefined];

  return { title: seoTitle(titleParts) };
};

export default function PlayerInitialPage() {
  const { players } = useLoaderData<LoaderData>();

  return (
    <>
      <PlayerList players={players} />
    </>
  );
}
