import React from "react";
import * as R from "remeda";
import { fetchMatches } from "data";
import { collectPlayers, sortByMatchesPlayed } from "helpers";
import { getPlayerName, getPlayerCatalog, getPlayerSlug } from "helpers";
import { Page, Block, LinkAnchor } from "components/layout";
import PlayersNav from "components/PlayersNav";
import { PlayerItem } from "types";

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
  players?: PlayerItem[];
};

export default function PlayerIndexPage({ catalog, players }: Props) {
  const titleParts = ["Players"];
  if (catalog) {
    titleParts.push(catalog.toUpperCase());
  }

  return (
    <Page title={titleParts}>
      <PlayersNav catalog={catalog} />

      {players && players.length > 0 && (
        <Block>
          {players.map(({ name, mp }) => {
            const _playerName = getPlayerName(name);
            const slug = getPlayerSlug(name);
            const catalog = getPlayerCatalog(name);

            return (
              <p key={slug}>
                <LinkAnchor
                  href={`/players/${catalog}/${slug}`}
                  title={name}
                  important={!!mp && mp >= 20}
                >
                  {_playerName.lastName},{" "}
                  {[_playerName.firstName, _playerName.middleName]
                    .join(" ")
                    .trim()}
                </LinkAnchor>{" "}
                ({mp})
              </p>
            );
          })}
        </Block>
      )}
    </Page>
  );
}
