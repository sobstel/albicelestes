import React, { ReactNode } from "react";

import { Block, LinkAnchor } from "~/components/layout";

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <LinkAnchor href={href} important>
      {children}
    </LinkAnchor>
  );
}

export default function PageHeader() {
  return (
    <header>
      <Block isNav hasBottomSeparator className="flex">
        <ul className="inline-flex items-center uppercase font-sans text-sm md:text-base">
          <li className="mr-4">
            <NavLink href="/">Matches</NavLink>
          </li>
          <li className="mr-4">
            <NavLink href="/players">Players</NavLink>
          </li>
          <li>
            <NavLink href="/teams">Teams</NavLink>
          </li>
        </ul>
      </Block>
    </header>
  );
}
