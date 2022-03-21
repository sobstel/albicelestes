import React from "react";

import { Block, Header, LinkAnchor } from "~/components/layout";
import { InfoLink } from "~/types";

type Props = { links?: Array<InfoLink> };

export default function InfoLinks({ links }: Props) {
  if (!links || links.length === 0) return null;

  return (
    <Block>
      <Header text="links" />
      {links.map((link) => (
        <p key={link.url}>
          <LinkAnchor href={link.url}>{link.text}</LinkAnchor>
          {link.desc && ` - ${link.desc}`}
        </p>
      ))}
    </Block>
  );
}
