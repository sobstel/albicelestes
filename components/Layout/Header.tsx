import React from "react";

type Props = { text: string; top?: boolean };

export default function Header({ text, top }: Props) {
  const Hx = top ? "h1" : "h2";
  return <Hx className="mb-4 font-semibold uppercase">{text}</Hx>;
}
