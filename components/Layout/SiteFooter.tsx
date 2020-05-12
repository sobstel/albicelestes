import React from "react";

import Link from "./Link";
import Logo from "./Logo";
import ExternalLink from "components/Layout/ExternalLink";

export default function SiteFooter() {
  return (
    <footer className="opacity-75 text-xs py-4 flex justify-between">
      <div className="flex items-center">
        <Link href="/" as="/" title="Albicelestes.com">
          <div className="w-6 h-6 mr-2">
            <Logo />
          </div>
        </Link>
        <p>
          created by{" "}
          <ExternalLink href="https://www.sobstel.org">sopel</ExternalLink>
        </p>
      </div>
      <p>
        <Link href="/about" as="/about">
          <a className="text-blue-600 hover:text-blue-400" rel="nofollow">
            about
          </a>
        </Link>
      </p>
    </footer>
  );
}
