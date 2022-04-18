import React from "react";

import { Block, LinkAnchor } from "~/components/layout";
import { getPlayerInitial, getPlayerName, getPlayerSlug } from "~/helpers";
import { PlayerItem } from "~/types";

export type Props = {
  players?: Array<PlayerItem>;
};

export default function PlayerList({ players }: Props) {
  if (!players || players.length === 0) return null;

  return (
    <Block>
      {players.map(({ name, mp }) => {
        const _playerName = getPlayerName(name);
        const slug = getPlayerSlug(name);
        const initial = getPlayerInitial(name);

        return (
          <p key={slug}>
            <LinkAnchor
              href={`/players/${initial}/${slug}`}
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
