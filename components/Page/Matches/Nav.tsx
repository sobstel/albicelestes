import * as R from "remeda";
import React, { useState, useEffect } from "react";
import { MIN_YEAR, MAX_YEAR } from "config";
import Link from "components/Layout/Link";

interface NavLinkProps {
  year: number;
  active?: boolean;
}

export function NavLink({ year, active = true }: NavLinkProps) {
  return (
    <li className="mr-4 inline-flex">
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

function OtherYears({ years }: { years: number[] }) {
  return (
    <ul className="mb-4">
      {years.map((year) => (
        <NavLink key={year} year={year} />
      ))}
    </ul>
  );
}

export default function Nav({ year = 2020 }: { year: number }) {
  if (!year) {
    return (
      <ul className="flex mb-4 font-semibold uppercase">
        {R.range(MAX_YEAR - 4, MAX_YEAR + 1).map((_year) => (
          <NavLink key={_year} year={_year} />
        ))}
      </ul>
    );
  }

  const [prevYearsActive, setPrevYearsActive] = useState(false);
  const [nextYearsActive, setNextYearsActive] = useState(false);

  const prevYear = year - 1;
  const nextYear = year + 1;

  const hasPrevYear = prevYear >= MIN_YEAR;
  const hasNextYear = nextYear <= MAX_YEAR;

  const hasPrevYears = prevYear - 1 >= MIN_YEAR;
  const hasNextYears = nextYear + 1 <= MAX_YEAR;

  useEffect(() => {
    setPrevYearsActive(false);
    setNextYearsActive(false);
  }, [year]);

  useEffect(() => {
    if (!hasPrevYears) {
      setPrevYearsActive(false);
    }
    if (!hasNextYears) {
      setNextYearsActive(false);
    }
  }, [prevYearsActive, nextYearsActive]);

  function togglePrevYears() {
    if (nextYearsActive) {
      setNextYearsActive(false);
    }
    setPrevYearsActive(!prevYearsActive);
  }

  function toggleNextYears() {
    if (prevYearsActive) {
      setPrevYearsActive(false);
    }
    setNextYearsActive(!nextYearsActive);
  }

  return (
    <>
      <ul className="flex mb-4 font-semibold uppercase">
        {hasPrevYears && (
          <li className="mr-4">
            <a
              className="text-blue-600 hover:text-blue-400"
              onClick={togglePrevYears}
            >
              ...
            </a>
          </li>
        )}
        {hasPrevYear && <NavLink year={prevYear} />}
        <NavLink year={year} active={false} />
        {hasNextYear && <NavLink year={nextYear} />}
        {hasNextYears && (
          <li className="mr-4">
            <a
              className="text-blue-600 hover:text-blue-400"
              onClick={toggleNextYears}
            >
              ...
            </a>
          </li>
        )}
      </ul>
      {prevYearsActive && (
        <OtherYears key="prev" years={R.reverse(R.range(MIN_YEAR, prevYear))} />
      )}
      {nextYearsActive && (
        <OtherYears key="next" years={R.range(nextYear + 1, MAX_YEAR + 1)} />
      )}
    </>
  );
}
