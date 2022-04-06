import React from "react";

import { Nav } from "~/components/layout";

type Props = { year: string };

export default function YearHeader({ year }: Props) {
  const items = [
    { text: "Matches", href: `/${year}` },
    { text: "Appearances", href: `/${year}/apps` },
    // { text: "Stats", href: `/${year}/stats` },
  ];

  return <Nav items={items} />;
}
