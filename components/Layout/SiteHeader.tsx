import React, { ReactNode } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Link from "./Link";
import Logo from "./Logo";

function NavLink({ href, children }: { href: string; children: ReactNode }) {
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
    return <span className={classNames.join(" ")}>{children}</span>;
  }

  classNames.push("text-link hover:text-link-hover");

  return (
    <NextLink href={href}>
      <a className={classNames.join(" ")}>{children}</a>
    </NextLink>
  );
}

export default function SiteHeader() {
  return (
    <nav className="flex items-center py-4">
      <div className="inline-block w-8 h-8 mr-4 hover:opacity-80">
        <Link href="/" title="Albicelestes.com">
          <Logo />
        </Link>
      </div>
      <NavLink href="/players">Players</NavLink>
      <NavLink href="/teams">Teams</NavLink>
    </nav>
  );
}
