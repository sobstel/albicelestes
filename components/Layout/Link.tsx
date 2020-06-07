import React, { ReactNode } from "react";
import NextLink from "next/link";

type Props = {
  href: string;
  as: string;
  important?: boolean;
  title?: string;
  children: ReactNode;
  rel?: string;
};

export default function Link(props: Props) {
  const classNames = [
    "text-blue-600",
    "hover:text-blue-400",
    "visited:text-indigo-700",
  ];

  if (props.important) {
    classNames.push("font-bold");
  }

  return (
    <NextLink href={props.href} as={props.as}>
      <a className={classNames.join(" ")} title={props.title} rel={props.rel}>
        {props.children}
      </a>
    </NextLink>
  );
}
