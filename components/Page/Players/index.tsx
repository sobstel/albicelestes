import React from "react";
import { getPlayerName, getPlayerCatalog, getPlayerSlug } from "helpers";
import Layout from "components/Layout";
import Section from "components/Layout/Section";
import Link from "components/Layout/Link";
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
        <Section title={catalog ? `Players (${catalog})` : "Players"}>
          {players.map(({ name, mp }) => {
            const _playerName = getPlayerName(name);
            const slug = getPlayerSlug(name);
            const catalog = getPlayerCatalog(name);

            return (
              <p key={slug}>
                <Link
                  href="/players/[catalog]/[slug]"
                  as={`/players/${catalog}/${slug}`}
                  title={name}
                  important={!!mp && mp >= 20}
                >
                  {_playerName.lastName},{" "}
                  {[_playerName.firstName, _playerName.middleName]
                    .join(" ")
                    .trim()}
                </Link>{" "}
                ({mp})
              </p>
            );
          })}
        </Section>
      )}
    </Layout>
  );
}
