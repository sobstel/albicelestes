import React, { forwardRef, ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

const CLASSNAME = "px-2 inline-block";

export default function Item({ children, className }: Props) {
  const fullClassName = [CLASSNAME, className].join(" ");
  return <li className={fullClassName}>{children}</li>;
}

export const ItemWithRef = forwardRef<HTMLLIElement, Props>(
  function ItemWithRef({ children }: Props, ref) {
    return (
      <li ref={ref} className={CLASSNAME}>
        {children}
      </li>
    );
  }
);
