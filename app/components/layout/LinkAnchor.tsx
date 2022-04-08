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
  // TODO: select-none select-none-x needed?
  const anchorClass = classNames("", {
    "cursor-pointer": props.href,
    "font-semibold": props.important,
    ...(props.className && { [props.className]: true }),
  });

  if (!props.href) {
    return (
      <span
        className={`${anchorClass} text-gray-400 select-none x-select-none`}
      >
        {props.children}
      </span>
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

  const forceActive = props.active !== undefined;

  return (
    <NavLink
      to={props.href}
      title={props.title}
      rel={props.rel}
      className={({ isActive }) =>
        `${anchorClass} ${
          (forceActive && props.active) || (!forceActive && isActive)
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
