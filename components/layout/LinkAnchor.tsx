import classNames from "classnames";
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
  const anchorClass = classNames({
    "text-black": props.active,
    "text-link hover:text-link-hover": !props.active,
    "font-semibold": props.important,
  });

  // external link
  if (props.href.startsWith("http")) {
    return (
      <a
        href={props.href}
        className={anchorClass}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {props.children} ➔
      </a>
    );
  }

  return (
    <NextLink href={props.href}>
      <a className={anchorClass} title={props.title} rel={props.rel}>
        {props.children}
      </a>
    </NextLink>
  );
}
