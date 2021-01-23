// import * as R from "remeda";
import React, { ReactNode, forwardRef } from "react";

type Props = {
  children: ReactNode;
  topSeparator?: boolean;
  bottomSeparator?: boolean;
  className?: string;
  nav?: boolean;
};

function Block(
  { children, topSeparator, bottomSeparator, className, nav }: Props,
  ref: unknown
) {
  let wrapperElement = "section";
  if (nav) wrapperElement = "nav";

  const classNames: string[] = className?.split(" ") ?? [];

  classNames.push("my-4");

  if (topSeparator || bottomSeparator) {
    classNames.push("border-dashed", "border-gray-300");
  }

  if (topSeparator) {
    classNames.push("border-t", "pt-4");
  }

  if (bottomSeparator) {
    classNames.push("border-b", "pb-4");
  }

  return React.createElement(
    wrapperElement,
    { className: classNames.join(" "), ref },
    <>{children}</>
  );
}

export default forwardRef<HTMLElement, Props>(Block);
