import * as R from "remeda";
import React, { ReactNode, useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { MIN_YEAR, MAX_YEAR } from "config";
import { Block, LinkAnchor } from "components/layout";

function Item({ children }: { children: ReactNode; itemId: string }) {
  return <>{children}</>;
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <div className="mr-4">
      <LinkAnchor disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        {"<<"}
      </LinkAnchor>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <div className="ml-4">
      <LinkAnchor disabled={isLastItemVisible} onClick={() => scrollNext()}>
        {">>"}
      </LinkAnchor>
    </div>
  );
}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

export default function YearNav({ activeYear }: { activeYear?: number }) {
  const handleInit = ({
    getItemById,
    scrollToItem,
  }: scrollVisibilityApiType) => {
    if (activeYear) {
      scrollToItem(getItemById(String(activeYear)), "auto", "center");
    }
  };

  return (
    <Block isNav hasBottomSeparator>
      <ul className="font-semibold">
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onInit={handleInit}
          scrollContainerClassName="scrollbar-hide"
          itemClassName="pr-4 last:pr-0 inline-block"
        >
          {R.map(R.range(MIN_YEAR, MAX_YEAR + 1), (year) => (
            <Item itemId={String(year)}>
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
