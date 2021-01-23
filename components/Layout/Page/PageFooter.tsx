import React from "react";
import { Block, LinkAnchor } from "components/Layout";

export default function PageFooter() {
  return (
    <footer>
      <Block topSeparator className="text-xs">
        <ul className="inline-flex">
          <li>
            <LinkAnchor href="/about" rel="nofollow">
              about
            </LinkAnchor>
          </li>
          <li className="ml-4">
            <LinkAnchor href="https://github.com/sobstel/albicelestes">
              github
            </LinkAnchor>
          </li>
          <li className="ml-4">
            <LinkAnchor href="https://twitter.com/albicelestescom">
              twitter
            </LinkAnchor>
          </li>
        </ul>
      </Block>
    </footer>
  );
}
