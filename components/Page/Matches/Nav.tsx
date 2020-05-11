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
    <li className="mr-4 inline-block">
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

function otherYears(years: number[]) {
  return years.map((year) => <NavLink key={year} year={year} />);
}

export default function Nav({ year }: { year: number }) {
  const [prevYearsActive, setPrevYearsActive] = useState(false);
  const [nextYearsActive, setNextYearsActive] = useState(false);

  const prevYear = year - 1;
  const nextYear = year + 1;

  const hasPrevYear = prevYear >= MIN_YEAR;
  const hasNextYear = nextYear <= MAX_YEAR;

  const hasPrevYears = prevYear - 1 >= MIN_YEAR;
  const hasNextYears = nextYear + 1 <= MAX_YEAR;

  useEffect(() => {
    if (!hasPrevYears) setPrevYearsActive(false);
    if (!hasNextYears) setNextYearsActive(false);
  }, [prevYearsActive, nextYearsActive]);

  function togglePrevYears() {
    setPrevYearsActive(!prevYearsActive);
  }

  function toggleNextYears() {
    setNextYearsActive(!nextYearsActive);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  useClientWidth(containerRef);

  return (
    <div ref={containerRef}>
      <ul className="mb-4 font-semibold uppercase">
        {prevYearsActive && otherYears(R.range(MIN_YEAR, prevYear))}
        {hasPrevYears && (
          <li className="mr-4 inline-block">
            <a
              className="text-blue-600 hover:text-blue-400 cursor-pointer"
              onClick={togglePrevYears}
            >
              {!prevYearsActive ? "<<" : ">>"}
            </a>
          </li>
        )}
        {hasPrevYear && <NavLink year={prevYear} />}
        <NavLink year={year} active={false} />
        {hasNextYear && <NavLink year={nextYear} />}
        {hasNextYears && (
          <li className="mr-4 inline-block">
            <a
              className="text-blue-600 hover:text-blue-400 cursor-pointer"
              onClick={toggleNextYears}
            >
              {nextYearsActive ? "<<" : ">>"}
            </a>
          </li>
        )}
        {nextYearsActive && otherYears(R.range(nextYear + 1, MAX_YEAR + 1))}
      </ul>
    </div>
  );
}
