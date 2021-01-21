import React from "react";
import Link from "./Link";
import ExternalLink from "components/Layout/ExternalLink";

export default function SiteFooter() {
  return (
    <footer className="opacity-75 text-xs py-4 flex">
      <div className="flex items-center">
        <p>
          created by{" "}
          <ExternalLink href="https://www.sobstel.org">sopel</ExternalLink>
        </p>
      </div>
      <p className="ml-4">
        <Link href="/about" rel="nofollow">
          about
        </Link>
      </p>
    </footer>
  );
}
