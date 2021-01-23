// import * as R from "remeda";
import React, { ReactNode, forwardRef } from "react";

type Props = {
  isNav?: boolean;
  hasTopSeparator?: boolean;
  hasBottomSeparator?: boolean;
  className?: string;
  header?: string | ReactNode;
  children: ReactNode;
};

function Block(
  { children, hasTopSeparator, hasBottomSeparator, className, isNav }: Props,
  ref: unknown
) {
  let wrapperElement = "section";
  if (isNav) wrapperElement = "nav";

  const classNames: string[] = className?.split(" ") ?? [];

  classNames.push("my-4");

  if (hasTopSeparator || hasBottomSeparator) {
    classNames.push("border-dashed", "border-gray-300");
  }

  if (hasTopSeparator) {
    classNames.push("border-t", "pt-4");
  }

  if (hasBottomSeparator) {
    classNames.push("border-b", "pb-4");
  }

  return React.createElement(
    wrapperElement,
    { className: classNames.join(" "), ref },
    <>{children}</>
  );
}

export default forwardRef<HTMLElement, Props>(Block);
