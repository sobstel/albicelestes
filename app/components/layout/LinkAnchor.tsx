import classNames from "classnames";
import React, { MouseEvent, ReactNode } from "react";
import { Link as RemixLink } from "remix";

type Props = {
  href?: string;
  children: ReactNode;
  important?: boolean;
  title?: string;
  rel?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function LinkAnchor(props: Props) {
  const anchorClass = classNames("select-none select-none-x", {
    "text-black": props.disabled,
    "text-link hover:text-link-hover cursor-pointer": !props.disabled,
    "font-semibold": props.important,
    ...(props.className && { [props.className]: true }),
  });

  if (props.disabled) {
    return (
      <span className={anchorClass} title={props.title}>
        {props.children}
      </span>
    );
  }

  if (!props.href) {
    return (
      <a
        className={anchorClass}
        title={props.title}
        rel={props.rel}
        // onClick={handleClick}
      >
        {props.children}
      </a>
    );
  }

  // external link
  if (props.href.startsWith("http")) {
    return (
      <a
        href={props.href}
        className={anchorClass}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {props.children}
      </a>
    );
  }

  return (
    <RemixLink
      to={props.href}
      title={props.title}
      rel={props.rel}
      className={anchorClass}
    >
      {props.children}
    </RemixLink>
  );
}
