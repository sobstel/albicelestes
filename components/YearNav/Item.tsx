import React, { ForwardedRef, forwardRef, ReactNode } from "react";

type Props = { children: ReactNode; itemId: number };

function Item({ children }: Props, ref: ForwardedRef<HTMLLIElement>) {
  return (
    <li className="px-2 inline-block" ref={ref}>
      {children}
    </li>
  );
}

export default forwardRef<HTMLLIElement, Props>(Item);
