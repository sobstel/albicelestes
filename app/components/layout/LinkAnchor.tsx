import classNames from "classnames";
import React, { ReactNode } from "react";
import { NavLink } from "remix";

type Props = {
  href?: string;
  children: ReactNode;
  important?: boolean;
  title?: string;
  rel?: string;
  className?: string;
  active?: boolean;
  end?: boolean;
};

export default function LinkAnchor(props: Props) {
  const anchorClass = classNames("select-none select-none-x cursor-pointer", {
    "font-semibold": props.important,
    ...(props.className && { [props.className]: true }),
  });

  if (!props.href) {
    return (
      <a className={anchorClass} title={props.title} rel={props.rel}>
        {props.children}
      </a>
    );
  }

  // external link
  if (props.href.startsWith("http")) {
    return (
      <a
        href={props.href}
        className={`text-link hover:text-link-hover ${anchorClass}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {props.children}
      </a>
    );
  }

  return (
    <NavLink
      to={props.href}
      title={props.title}
      rel={props.rel}
      className={({ isActive }) =>
        `${anchorClass} ${
          isActive || props.active
            ? "text-black"
            : "text-link hover:text-link-hover"
        }`
      }
      end={props.end}
    >
      {props.children}
    </NavLink>
  );
}
