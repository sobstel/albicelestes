import React from "react";
import Link from "components/Layout/Link";
import Item from "./Item";

export default function NavLink({ year }: { year: number }) {
  return (
    <Item>
      <Link href={`/matches/${year}`}>{year}</Link>
    </Item>
  );
}
