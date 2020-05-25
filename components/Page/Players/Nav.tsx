import React from "react";
import Link from "components/Layout/Link";

export const ALPHABET = "abcdefghijklmnopqrstuvwyz".split("");

function Nav({ catalog }: { catalog?: string }) {
  return (
    <nav>
      <ul className="mb-4 font-semibold uppercase">
        {ALPHABET.map((_catalog) => {
          return (
            <li key={_catalog} className="mr-4 inline-flex">
              {catalog !== _catalog ? (
                <Link href="/players/[catalog]" as={`/players/${_catalog}`}>
                  {_catalog}
                </Link>
              ) : (
                _catalog
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
