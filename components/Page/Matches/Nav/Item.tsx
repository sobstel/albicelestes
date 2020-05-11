import React, { forwardRef, ReactNode } from "react";

type Props = { children: ReactNode };

const CLASSNAME = "px-2 inline-block";

export default function Item({ children }: Props) {
  return <li className={CLASSNAME}>{children}</li>;
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
