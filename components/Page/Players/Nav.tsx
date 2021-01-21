import React from "react";
import Link from "components/Layout/Link";

export const ALPHABET = "abcdefghijklmnopqrstuvwyz".split("");

function Nav({ catalog }: { catalog?: string }) {
  return (
    <nav>
      <ul className="my-4 font-semibold uppercase">
        {ALPHABET.map((_catalog) => {
          return (
            <li key={_catalog} className="mr-4 inline-flex">
              <Link href={`/players/${_catalog}`} active={catalog === _catalog}>
                {_catalog}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
