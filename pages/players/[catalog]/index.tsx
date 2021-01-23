import React from "react";
import * as R from "remeda";
import slugify from "slugify";
import { fetchMatches } from "data";
import { collectPlayers, getPlayerName, getPlayerCatalog } from "helpers";
import Page, { Props } from "../";
import { ALPHABET } from "components/PlayersNav";

type Context = { params: { catalog: string } };

export async function getStaticProps(context: Context) {
  const { catalog } = context.params;

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
    props: { catalog, players },
  };
}

export async function getStaticPaths() {
  return {
    paths: R.map(ALPHABET, (catalog) => ({ params: { catalog } })),
    fallback: false,
  };
}

export default function PlayerCatalogPage(props: Props) {
  return <Page {...props} />;
}
