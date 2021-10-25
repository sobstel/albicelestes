import React, { ReactNode } from "react";

type Props = { children: ReactNode; itemId: number };

export default function Item({ children }: Props) {
  return <li className="px-2 inline-block">{children}</li>;
}
