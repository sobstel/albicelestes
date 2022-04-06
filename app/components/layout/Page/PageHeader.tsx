import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { Block, LinkAnchor } from "~/components/layout";

const HomeLink = () => {
  const location = useLocation();
  return (
    <LinkAnchor href="/" active={/\/\d{4}/.test(location.pathname)} important>
      Argentina
    </LinkAnchor>
  );
};

export default function PageHeader() {
  return (
    <header>
      <Block isNav hasBottomSeparator className="flex">
        <ul className="inline-flex items-center uppercase font-sans text-sm md:text-base">
          <li className="mr-4">
            <HomeLink />
          </li>
          <li className="mr-4">
            <LinkAnchor href="/players" important>
              Players
            </LinkAnchor>
          </li>
          <li>
            <LinkAnchor href="/teams" important>
              Teams
            </LinkAnchor>
          </li>
        </ul>
      </Block>
    </header>
  );
}
