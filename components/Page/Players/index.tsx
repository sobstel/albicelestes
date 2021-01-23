import React from "react";
import { getPlayerName, getPlayerCatalog, getPlayerSlug } from "helpers";
import Layout from "components/Layout/Page";
import Section from "components/Layout/Section";
import { LinkAnchor } from "components/Layout";
import Nav from "./Nav";
import { PlayerItem } from "types";

export type Props = {
  catalog?: string;
  players?: PlayerItem[];
};

export default function PlayersPage({ catalog, players }: Props) {
  const titleParts = ["Players"];
  if (catalog) {
    titleParts.push(catalog.toUpperCase());
  }

  return (
    <Layout title={titleParts}>
      <Nav catalog={catalog} />

      {players && players.length > 0 && (
        <Section>
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
        </Section>
      )}
    </Layout>
  );
}
