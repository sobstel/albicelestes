import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  title?: string;
  children: ReactNode;
  top?: boolean;
};

export default function Section({ title, children, top }: Props) {
  return (
    <div className="mb-4">
      {title && <Header text={title} top={top} />}
      <div>{children}</div>
    </div>
  );
}
