import React, { ReactNode } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MAX_YEAR } from "config";

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
  const classNames = ["inline-block", "font-semibold", "uppercase", "mr-4"];

  if (router?.pathname.startsWith(href)) {
    classNames.push("text-black");
  } else {
    classNames.push("text-blue-600 hover:text-blue-400");
  }

  return (
    <NextLink href={href} as={as}>
      <a className={classNames.join(" ")}>{children}</a>
    </NextLink>
  );
}

export default function SiteHeader() {
  return (
    <nav className="flex items-center justify-between flex-wrap py-4 px-1">
      <div className="flex-grow text-base md:text-lg">
        <NavLink href="/matches/[year]" as={`/matches/${MAX_YEAR}`}>
          Matches
        </NavLink>
        <NavLink href="/players" as="/players">
          Players
        </NavLink>
        <NavLink href="/teams" as="/teams">
          Teams
        </NavLink>
      </div>
    </nav>
  );
}
