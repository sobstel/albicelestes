import React from "react";
import * as R from "remeda";
import slugify from "slugify";
import { fetchMatches } from "db";
import { collectPlayers } from "functions";
import { playerName, playerCatalog } from "helpers";
import Page, { Props } from "components/Page/Players";
import { ALPHABET } from "components/Page/Players/Nav";

export default function PageContainer(props: Props) {
  return <Page {...props} />;
}

type Context = { params: { catalog: string } };

export async function getStaticProps(context: Context) {
  const { catalog } = context.params;

  const players = R.pipe(
    fetchMatches(),
    collectPlayers,
    R.filter((player) => playerCatalog(player.name) === catalog),
    R.sortBy((player) => {
      const _playerName = playerName(player.name);
      return slugify(
        [
          _playerName.lastName,
          _playerName.firstName,
          _playerName.middleName,
        ].join(" "),
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
