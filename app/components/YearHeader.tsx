import React from "react";

import { Header } from "~/components/layout";

type Props = { year: string };

export default function YearHeader({ year }: Props) {
  const nav = [
    { text: "Matches", href: `/${year}` },
    { text: "Appearances", href: `/${year}/players` },
    // { text: "Stats", href: `/${year}/stats` },
  ];

  return <Header text={`${year}+`} top nav={nav} />;
}
