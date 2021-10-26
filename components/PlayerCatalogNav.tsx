import React from "react";
import { Block } from "components/layout";
import HorizontalNav from "components/HorizontalNav";

export const ALPHABET = "abcdefghijklmnopqrstuvwyz".split("");

export default function PlayerCatalogNav({ catalog }: { catalog?: string }) {
  const items = ALPHABET.map((_catalog) => ({
    id: _catalog,
    href: `/players/${_catalog}`,
    text: _catalog,
  }));

  return (
    <Block isNav hasBottomSeparator>
      <div className="font-semibold uppercase">
        <HorizontalNav items={items} activeItemId={catalog} />
      </div>
    </Block>
  );
}
