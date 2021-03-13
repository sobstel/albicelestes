import React from "react";
import { PlayerItem } from "types";
import { getPlayerName, getPlayerCatalog, getPlayerSlug } from "helpers";
import { Block, LinkAnchor } from "components/layout";

export type Props = {
  players?: PlayerItem[];
};

export default function PlayerList({ players }: Props) {
  if (!players || players.length === 0) return null;

  return (
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
              {[_playerName.firstName, _playerName.middleName].join(" ").trim()}
            </LinkAnchor>{" "}
            ({mp})
          </p>
        );
      })}
    </Block>
  );
}
