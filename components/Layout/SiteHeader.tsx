import React, { ReactNode } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Link from "./Link";
import Logo from "./Logo";

function NavLink({
  href,
  as,
  children,
}: {
  href: string;
  as: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const classNames = [
    "inline-block",
    "mr-4",
    "font-semibold",
    "uppercase",
    "text-sm",
    "md:text-base",
  ];

  if (router?.pathname.startsWith(href)) {
    classNames.push("text-black");
  } else {
    classNames.push("text-link hover:text-link-hover");
  }

  return (
    <NextLink href={href} as={as}>
      <a className={classNames.join(" ")}>{children}</a>
    </NextLink>
  );
}

export default function SiteHeader() {
  return (
    <nav className="flex items-center py-4">
      <div className="inline-block w-8 h-8 mr-4 hover:opacity-80">
        <Link href="/" as="/" title="Albicelestes.com">
          <Logo />
        </Link>
      </div>
      <NavLink href="/players" as="/players">
        Players
      </NavLink>
      <NavLink href="/teams" as="/teams">
        Teams
      </NavLink>
    </nav>
  );
}
