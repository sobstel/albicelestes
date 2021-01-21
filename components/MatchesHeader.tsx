import React from "react";
import Header from "components/Layout/Header";

type Props = { year: string };

export default function MatchesHeader({ year }: Props) {
  return (
    <Header
      text={year}
      top
      nav={[
        { text: "Matches", href: `/${year}` },
        { text: "Players", href: `/${year}/players` },
        // { text: "Stats", href: `/${year}/stats` },
      ]}
    />
  );
}
