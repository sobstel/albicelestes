import * as R from "remeda";
import React, { ReactNode, useState, useEffect, useRef, useMemo } from "react";
import { MIN_YEAR, MAX_YEAR } from "config";
import useClientWidth from "hooks/useClientWidth";
import { Block, LinkAnchor } from "components/Layout";
import { ItemWithRef } from "./Item";
import NavLink from "./NavLink";
import ToggleLink from "./ToggleLink";

function FadeIn({ children }: { children: ReactNode }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(100);
  }, []);

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out opacity-${opacity}`}
    >
      {children}
    </div>
  );
}

function yearItems(startYear: number, endYear: number) {
  if (endYear < startYear) return null;
  const years = R.range(startYear, endYear + 1);
  return years.map((year) => <NavLink key={year} year={year} />);
}

function yearRange({
  width,
  year,
  itemWidth,
}: {
  width: number;
  itemWidth: number;
  year: number;
}) {
  // subtracts toggle links and active item
  const itemsNum = Math.floor(width / itemWidth) - 3;

  let prevItemsNum = Math.max(Math.floor(itemsNum / 2), 0);
  let nextItemsNum = itemsNum - prevItemsNum;

  if (year - prevItemsNum < MIN_YEAR) {
    prevItemsNum = year - MIN_YEAR;
    nextItemsNum = itemsNum - prevItemsNum;
  }

  if (year + nextItemsNum > MAX_YEAR) {
    nextItemsNum = MAX_YEAR - year;
    prevItemsNum = itemsNum - nextItemsNum;
  }

  let startYear = year - prevItemsNum;
  let endYear = year + nextItemsNum;

  // show more year items if one of toggle items not displayed
  if (startYear === MIN_YEAR) endYear += 1;
  if (endYear === MAX_YEAR) startYear -= 1;

  return [startYear, endYear];
}

export default function Nav({ year }: { year: number }) {
  const [prevYearsActive, setPrevYearsActive] = useState(false);
  const [nextYearsActive, setNextYearsActive] = useState(false);

  const togglePrevYears = () => {
    setNextYearsActive(false);
    setPrevYearsActive((prevYearsActive) => !prevYearsActive);
  };
  const toggleNextYears = () => {
    setPrevYearsActive(false);
    setNextYearsActive((nextYearsActive) => !nextYearsActive);
  };

  useEffect(() => {
    if (prevYearsActive) setPrevYearsActive(false);
    if (nextYearsActive) setNextYearsActive(false);
  }, [year]);

  const containerRef = useRef<HTMLDivElement>(null);
  const clientWidth = useClientWidth(containerRef);
  const activeItemRef = useRef<HTMLLIElement>(null);

  // useMemo to avoid repaint/reflow on activeItem witdh reading
  const [startYear, endYear] = useMemo(() => {
    if (!clientWidth) return [year, year];
    const itemWidth = activeItemRef?.current?.clientWidth || 50;
    return yearRange({ width: clientWidth, itemWidth, year });
  }, [clientWidth, year]);

  return (
    <Block nav bottomSeparator ref={containerRef}>
      <ul className="-mx-2 font-semibold">
        {startYear > MIN_YEAR && (
          <ToggleLink
            onClick={togglePrevYears}
            active={prevYearsActive}
            label={"<<"}
          />
        )}
        {yearItems(startYear, year - 1)}
        <ItemWithRef ref={activeItemRef}>
          <LinkAnchor href={`/${year}`} active>
            {year}
          </LinkAnchor>
        </ItemWithRef>
        {yearItems(year + 1, endYear)}
        {endYear < MAX_YEAR && (
          <ToggleLink
            onClick={toggleNextYears}
            active={nextYearsActive}
            label={">>"}
          />
        )}
      </ul>
      {prevYearsActive && (
        <FadeIn>
          <ul>{yearItems(MIN_YEAR, startYear - 1)?.reverse()}</ul>
        </FadeIn>
      )}
      {nextYearsActive && (
        <FadeIn>
          <ul>{yearItems(endYear + 1, MAX_YEAR)}</ul>
        </FadeIn>
      )}
    </Block>
  );
}
