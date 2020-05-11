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
  // subtract toggle links and active item
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

  const startYear = year - prevItemsNum;
  const endYear = year + nextItemsNum;

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

  const [startYear, endYear] = useMemo(() => {
    if (!clientWidth || !activeItemRef.current) return [year, year];
    const itemWidth = activeItemRef.current.clientWidth;
    return yearRange({ width: clientWidth, itemWidth, year });
  }, [clientWidth, year]);

  return (
    <div ref={containerRef} className="-mx-2 mb-4 font-semibold">
      {prevYearsActive && <ul>{yearItems(MIN_YEAR, startYear - 1)}</ul>}

      <ul>
        {startYear > MIN_YEAR && (
          <ToggleLink
            onClick={togglePrevYears}
            label={prevYearsActive ? "<>" : "<<"}
          />
        )}
        {yearItems(startYear, year - 1)}
        <ItemWithRef ref={activeItemRef}>{year}</ItemWithRef>
        {yearItems(year + 1, endYear)}
        {endYear < MAX_YEAR && (
          <ToggleLink
            onClick={toggleNextYears}
            label={nextYearsActive ? "<>" : ">>"}
          />
        )}
      </ul>

      {nextYearsActive && <ul>{yearItems(endYear + 1, MAX_YEAR)}</ul>}
    </div>
  );
}
