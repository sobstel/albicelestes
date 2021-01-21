import React from "react";
import Link from "./Link";
import ExternalLink from "components/Layout/ExternalLink";

export default function SiteFooter() {
  return (
    <footer className="opacity-75 text-xs py-4 ">
      <ul className="inline-flex">
        <li>
          <Link href="/about" rel="nofollow">
            about
          </Link>
        </li>
        <li className="ml-4">
          <ExternalLink href="https://github.com/sobstel/albicelestes">
            github
          </ExternalLink>
        </li>
        <li className="ml-4">
          <ExternalLink href="https://twitter.com/albicelestescom">
            twitter
          </ExternalLink>
        </li>
      </ul>
    </footer>
  );
}
