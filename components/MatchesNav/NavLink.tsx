import React from "react";
import { LinkAnchor } from "components/Layout";
import Item from "./Item";

export default function NavLink({ year }: { year: number }) {
  return (
    <Item>
      <LinkAnchor href={`/${year}`}>{year}</LinkAnchor>
    </Item>
  );
}
