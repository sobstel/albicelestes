import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import slugify from "slugify";

import PlayerCatalogNav from "~/components/PlayerCatalogNav";
import PlayerList from "~/components/PlayerList";
import { fetchMatches } from "~/data";
import {
  collectPlayers,
  getMatchDate,
  getMatchTeams,
  getPlayerCatalog,
  getPlayerName,
} from "~/helpers";
import { seoDescription, seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { catalog },
}: Parameters<LoaderFunction>[0]) {
  const players = R.pipe(
    fetchMatches(),
    collectPlayers,
    R.filter((player) => getPlayerCatalog(player.name) === catalog),
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
    catalog,
    players,
  };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

export const meta: MetaFunction = ({
  data: { catalog },
}: {
  data: LoaderData;
}) => {
  const titleParts = ["Players", catalog ? catalog.toUpperCase() : undefined];

  return { title: seoTitle(titleParts) };
};

export default function PlayerCatalogPage() {
  const { players, catalog } = useLoaderData<LoaderData>();

  return (
    <>
      <PlayerCatalogNav catalog={catalog} />
      <PlayerList players={players} />
    </>
  );
}
