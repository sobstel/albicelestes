import React from "react";

import { Block, LinkAnchor } from "~/components/layout";

type Props = { items: Array<{ href: string; text: string }> };

export default function Nav({ items }: Props) {
  return (
    <Block hasBottomSeparator>
      <nav>
        <ul className="inline-flex uppercase">
          {items.map(({ href, text }) => (
            <li key={href} className="mr-2">
              <LinkAnchor href={href} important end>
                {text}
              </LinkAnchor>
            </li>
          ))}
        </ul>
      </nav>
    </Block>
  );
}
