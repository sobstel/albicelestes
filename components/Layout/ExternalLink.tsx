import React, { ReactNode } from "react";

export default function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-link hover:text-link-hover"
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {children} ➔
    </a>
  );
}
