import React from "react";
import { Block, LinkAnchor } from "components/layout";

export const ALPHABET = "abcdefghijklmnopqrstuvwyz".split("");

export default function PlayerCatalogNav({ catalog }: { catalog?: string }) {
  return (
    <Block isNav hasBottomSeparator>
      <ul className="font-semibold uppercase">
        {ALPHABET.map((_catalog) => {
          return (
            <li key={_catalog} className="mr-4 inline-flex">
              <LinkAnchor
                href={`/players/${_catalog}`}
                active={catalog === _catalog}
              >
                {_catalog}
              </LinkAnchor>
            </li>
          );
        })}
      </ul>
    </Block>
  );
}
