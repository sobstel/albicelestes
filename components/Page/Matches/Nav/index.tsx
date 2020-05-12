import * as R from "remeda";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { MIN_YEAR, MAX_YEAR } from "config";
import useClientWidth from "hooks/useClientWidth";
import { ItemWithRef } from "./Item";
import NavLink from "./NavLink";
import ToggleLink from "./ToggleLink";

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

  const togglePrevYears = () => setPrevYearsActive(!prevYearsActive);
  const toggleNextYears = () => setNextYearsActive(!nextYearsActive);

  useEffect(() => {
    if (prevYearsActive) setPrevYearsActive(false);
    if (nextYearsActive) setNextYearsActive(false);
  }, [year]);

  const containerRef = useRef<HTMLDivElement>(null);
  const clientWidth = useClientWidth(containerRef);
  const activeItemRef = useRef<HTMLLIElement>(null);

  // useMemo to avoid repaint/reflow on activeItem witdh reading
  const [startYear, endYear] = useMemo(() => {
    if (!clientWidth || !activeItemRef.current) return [year, year];
    const itemWidth = activeItemRef.current.clientWidth;
    return yearRange({ width: clientWidth, itemWidth, year });
  }, [clientWidth, year]);

  return (
    <div ref={containerRef} className="-mx-2 mb-4 font-semibold">
      {prevYearsActive && (
        <ul className="bg-gray-100">{yearItems(MIN_YEAR, startYear - 1)}</ul>
      )}
      <ul>
        {startYear > MIN_YEAR && (
          <ToggleLink
            onClick={togglePrevYears}
            active={prevYearsActive}
            label={"<<"}
          />
        )}
        {yearItems(startYear, year - 1)}
        <ItemWithRef ref={activeItemRef}>{year}</ItemWithRef>
        {yearItems(year + 1, endYear)}
        {endYear < MAX_YEAR && (
          <ToggleLink
            onClick={toggleNextYears}
            active={nextYearsActive}
            label={">>"}
          />
        )}
      </ul>
      {nextYearsActive && (
        <ul className="bg-gray-100">{yearItems(endYear + 1, MAX_YEAR)}</ul>
      )}
    </div>
  );
}
