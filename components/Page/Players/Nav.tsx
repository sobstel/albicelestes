import React from "react";
import { LinkAnchor } from "components/Layout";

export const ALPHABET = "abcdefghijklmnopqrstuvwyz".split("");

function Nav({ catalog }: { catalog?: string }) {
  return (
    <nav>
      <ul className="my-4 font-semibold uppercase">
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
    </nav>
  );
}

export default Nav;
