import React from "react";
import { Block, LinkAnchor } from "components/layout";

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
          <li className="ml-4">
            <LinkAnchor href="https://github.com/sobstel/albicelestes">
              github
            </LinkAnchor>
          </li>
          <li className="ml-4">
            <LinkAnchor href="https://twitter.com/albisopel">
              twitter
            </LinkAnchor>
          </li>
        </ul>
      </Block>
    </footer>
  );
}
