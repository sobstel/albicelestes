import * as R from "remeda";
import React, { useState, useEffect, useRef } from "react";
import { MIN_YEAR, MAX_YEAR } from "config";
import useClientWidth from "hooks/useClientWidth";
import Link from "components/Layout/Link";

interface NavLinkProps {
  year: number;
  active?: boolean;
}

export function NavLink({ year, active = true }: NavLinkProps) {
  return (
    <li className="px-2 inline-block">
      {active ? (
        <Link href="/matches/[year]" as={`/matches/${year}`}>
          {year}
        </Link>
      ) : (
        year
      )}
    </li>
  );
}

function navYears(years: number[]) {
  return years.map((year) => <NavLink key={year} year={year} />);
}

export default function Nav({ year }: { year: number }) {
  const [prevYearsActive, setPrevYearsActive] = useState(false);
  const [nextYearsActive, setNextYearsActive] = useState(false);

  function togglePrevYears() {
    setPrevYearsActive(!prevYearsActive);
  }

  function toggleNextYears() {
    setNextYearsActive(!nextYearsActive);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const clientWidth = useClientWidth(containerRef);

  // TODO: move to effect
  const itemsNum = Math.floor(clientWidth / 54) - 2 - 1;
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

  const rangeStartYear = year - prevItemsNum;
  const rangeEndYear = year + nextItemsNum;
  const hasMorePrevYears = rangeStartYear > MIN_YEAR;
  const hasMoreNextYears = rangeEndYear < MAX_YEAR;

  useEffect(() => {
    if (prevYearsActive) setPrevYearsActive(false);
    if (nextYearsActive) setNextYearsActive(false);
  }, [year]);

  return (
    <div ref={containerRef} className="-ml-2 mb-4 font-semibold">
      {prevYearsActive && (
        <ul>{navYears(R.range(MIN_YEAR, rangeStartYear))}</ul>
      )}
      <ul>
        {hasMorePrevYears && (
          <li key="prev" className="px-2 inline-block">
            <a
              className="text-blue-600 hover:text-blue-400 cursor-pointer"
              onClick={togglePrevYears}
            >
              {prevYearsActive ? "<>" : "<<"}
            </a>
          </li>
        )}
        {navYears(R.range(rangeStartYear, year))}
        <NavLink key={year} year={year} active={false} />
        {navYears(R.range(year + 1, rangeEndYear + 1))}
        {hasMoreNextYears && (
          <li key="next" className="px-2 inline-block">
            <a
              className="text-blue-600 hover:text-blue-400 cursor-pointer"
              onClick={toggleNextYears}
            >
              {nextYearsActive ? "<>" : ">>"}
            </a>
          </li>
        )}
      </ul>
      {nextYearsActive && (
        <ul>{navYears(R.range(rangeEndYear + 1, MAX_YEAR + 1))}</ul>
      )}
    </div>
  );
}
