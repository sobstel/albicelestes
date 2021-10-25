import * as R from "remeda";
import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { MIN_YEAR, MAX_YEAR } from "config";
import { Block, LinkAnchor } from "components/layout";
import Item from "./Item";

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <div className="mr-2">
      <LinkAnchor disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        {"<<"}
      </LinkAnchor>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  console.log({ VisibilityContext: useContext(VisibilityContext) });

  return (
    <div className="ml-2">
      <LinkAnchor disabled={isLastItemVisible} onClick={() => scrollNext()}>
        {">>"}
      </LinkAnchor>
    </div>
  );
}

export default function YearNav({ activeYear }: { activeYear?: number }) {
  return (
    <Block isNav hasBottomSeparator>
      <ul className="font-semibold">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {R.map(R.range(MIN_YEAR, MAX_YEAR + 1), (year) => (
            <Item key={year} itemId={year}>
              <LinkAnchor href={`/${year}`} disabled={year === activeYear}>
                {year}
              </LinkAnchor>
            </Item>
          ))}
        </ScrollMenu>
      </ul>
    </Block>
  );
}
