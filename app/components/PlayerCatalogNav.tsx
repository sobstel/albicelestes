import React, { Fragment } from "react";
import { Block, LinkAnchor } from "~/components/layout";
import * as R from "remeda";

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
        {R.map(items, ({ id, href, text }) => (
          <Fragment key={id}>
            <LinkAnchor href={href} disabled={id === catalog} className="mr-2">
              {text}
            </LinkAnchor>{" "}
          </Fragment>
        ))}
        <span className="clear-left">&nbsp;</span>
      </div>
    </Block>
  );
}
