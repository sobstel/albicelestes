import * as R from "remeda";
import React from "react";
import { MIN_YEAR, MAX_YEAR } from "config";
import { Block } from "components/layout";
import HorizontalNav from "components/HorizontalNav";

export default function YearNav({ activeYear }: { activeYear?: number }) {
  const items = R.map(R.range(MIN_YEAR, MAX_YEAR + 1), (year) => ({
    id: String(year),
    href: `/${year}`,
    text: String(year),
  }));

  return (
    <Block isNav hasBottomSeparator>
      <div className="font-semibold">
        <HorizontalNav items={items} activeItemId={String(activeYear)} />
      </div>
    </Block>
  );
}
