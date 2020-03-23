import { ReactNode } from "react";
import Header from "./Header";

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <div className="mb-4">
      {title && <Header text={title} />}
      <div>{children}</div>
    </div>
  );
}
