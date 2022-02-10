import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Block, LinkAnchor } from "components/layout";
import Logo from "./Logo";

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  const disabled = router?.pathname.startsWith(href);

  return (
    <LinkAnchor href={href} disabled={disabled} important>
      {children}
    </LinkAnchor>
  );
}

export default function PageHeader() {
  return (
    <header>
      <Block isNav hasBottomSeparator className="flex">
        <ul className="inline-flex items-center uppercase font-sans text-sm md:text-base">
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
