import React from "react";

import { Block, LinkAnchor } from "~/components/layout";

export default function PageFooter() {
  return (
    <footer>
      <Block hasTopSeparator className="text-xs uppercase">
        Created by
        <LinkAnchor href="https://sobstel.dev/" className="mx-1">
          sobstel
        </LinkAnchor>
        ·
        <LinkAnchor href="/about" rel="nofollow" className="mx-1">
          About
        </LinkAnchor>
        ·
        <LinkAnchor href="/status" rel="nofollow" className="mx-1">
          Status
        </LinkAnchor>
      </Block>
    </footer>
  );
}
