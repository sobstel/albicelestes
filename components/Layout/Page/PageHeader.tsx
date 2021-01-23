import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Block, LinkAnchor } from "components/Layout";
import Logo from "./Logo";

// TODO: use our link
function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  const active = router?.pathname.startsWith(href);

  return (
    <LinkAnchor href={href} active={active} important>
      {children}
    </LinkAnchor>
  );
}

export default function PageHeader() {
  return (
    <header>
      <Block nav bottomSeparator className="flex">
        <ul className="inline-flex items-center uppercase text-sm md:text-base">
          <li className="w-8 h-8 mr-4 hover:opacity-80">
            <LinkAnchor href="/" title="Albicelestes.com">
              <Logo />
            </LinkAnchor>
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
