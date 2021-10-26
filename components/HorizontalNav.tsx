import * as R from "remeda";
import React, { ReactNode, useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { LinkAnchor } from "components/layout";

function Item({ children }: { children: ReactNode; itemId: string }) {
  return <>{children}</>;
}

function LeftArrow() {
  const { initComplete, isFirstItemVisible, scrollPrev } =
    useContext(VisibilityContext);
  const handleClick = () => scrollPrev();

  if (!initComplete || isFirstItemVisible) {
    return null;
  }

  return (
    <div className="mr-4">
      <LinkAnchor onClick={handleClick}>{"<<"}</LinkAnchor>
    </div>
  );
}

function RightArrow() {
  const { initComplete, isLastItemVisible, scrollNext } =
    useContext(VisibilityContext);
  const handleClick = () => scrollNext();

  if (!initComplete && isLastItemVisible) {
    return null;
  }

  return (
    <div className="ml-4">
      <LinkAnchor onClick={handleClick}>{">>"}</LinkAnchor>
    </div>
  );
}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

type Props = {
  items: ReadonlyArray<{ id: string; href: string; text: string }>;
  activeItemId?: string;
};

export default function HorizontalNav({ items, activeItemId }: Props) {
  const handleInit = ({
    getItemById,
    scrollToItem,
  }: scrollVisibilityApiType) => {
    if (activeItemId) {
      scrollToItem(getItemById(activeItemId), "auto", "center");
    }
  };

  return (
    <div className="font-semibold">
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onInit={handleInit}
        scrollContainerClassName="scrollbar-hide"
        itemClassName="pr-4 last:pr-0 inline-block"
      >
        {R.map(items, ({ id, href, text }) => (
          <Item itemId={id}>
            <LinkAnchor href={href} disabled={id === activeItemId}>
              {text}
            </LinkAnchor>
          </Item>
        ))}
      </ScrollMenu>
    </div>
  );
}
