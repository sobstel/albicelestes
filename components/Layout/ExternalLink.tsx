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
      className="text-blue-600 hover:text-blue-400"
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {children} ➔
    </a>
  );
}
