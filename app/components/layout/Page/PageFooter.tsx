import React from "react";
import { Block, LinkAnchor } from "~/components/layout";

export default function PageFooter() {
  return (
    <footer>
      <Block hasTopSeparator className="text-xs">
        <ul className="inline-flex">
          <li>
            <LinkAnchor href="/about" rel="nofollow">
              about
            </LinkAnchor>
          </li>
        </ul>
      </Block>
    </footer>
  );
}
