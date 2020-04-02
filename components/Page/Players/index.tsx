import { playerName, playerCatalog, playerSlug } from "../../../helpers";
import Layout from "../../Layout";
import Section from "../..//Layout/Section";
import Link from "../../Layout/Link";
import Nav from "./Nav";

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
        <Section title="Players">
          {players.map(({ id, name, mp }) => {
            const _playerName = playerName(name);
            const slug = playerSlug(name);
            const catalog = playerCatalog(name);

            return (
              <p key={id}>
                <Link
                  href="/players/[catalog]/[slug]/[id]"
                  as={`/players/${catalog}/${slug}/${id}`}
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
