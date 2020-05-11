import React from "react";

import Link from "./Link";
import Logo from "./Logo";

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="ml-1 text-blue-600 hover:text-blue-400"
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {children}
    </a>
  );
}

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
          created by
          <FooterLink href="https://www.sobstel.org">sopel</FooterLink>
        </p>
      </div>
      <p>
        <FooterLink href="https://github.com/sobstel/albicelestes">
          github
        </FooterLink>{" "}
        /
        <FooterLink href="https://twitter.com/albicelestescom">
          twitter
        </FooterLink>
      </p>
    </footer>
  );
}
