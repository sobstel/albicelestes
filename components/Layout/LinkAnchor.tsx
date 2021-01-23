import React, { ReactNode } from "react";
import NextLink from "next/link";

type Props = {
  href: string;
  children: ReactNode;
  important?: boolean;
  title?: string;
  rel?: string;
  active?: boolean;
};

export default function LinkAnchor(props: Props) {
  const classNames = props.active
    ? ["text-black"]
    : ["text-link", "hover:text-link-hover"];

  if (props.important) {
    classNames.push("font-semibold");
  }

  // external link
  if (props.href.startsWith("http")) {
    return (
      <a
        href={props.href}
        className={classNames.join(" ")}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {props.children} ➔
      </a>
    );
  }

  return (
    <NextLink href={props.href}>
      <a className={classNames.join(" ")} title={props.title} rel={props.rel}>
        {props.children}
      </a>
    </NextLink>
  );
}
