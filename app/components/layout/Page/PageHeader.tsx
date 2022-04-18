import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { Block, LinkAnchor } from "~/components/layout";

const HomeLink = () => {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";
  const isYearRoute = /^\/\d{4}(\-\d{4})?$/.test(location.pathname);

  return (
    <LinkAnchor href="/" active={isRootRoute || isYearRoute} important>
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
            <LinkAnchor href="/rivals" important>
              Rivals
            </LinkAnchor>
          </li>
        </ul>
      </Block>
    </header>
  );
}
