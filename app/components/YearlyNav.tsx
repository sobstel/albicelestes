import debounce from "lodash.debounce";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as R from "remeda";

import { Block, LinkAnchor } from "~/components/layout";
import { MAX_YEAR, MIN_YEAR } from "~/config";

// https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
const isBrowser = typeof window !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

function DefaultNav({ activeYear }: { activeYear?: string }) {
  const currentYear = activeYear ?? String(MAX_YEAR);
  const anyYearActive = Boolean(activeYear);

  const [yearRange, setYearRange] = useState<[string, string]>([
    currentYear,
    currentYear,
  ]);

  const prevNextShift =
    parseInt(yearRange[1], 10) - parseInt(yearRange[0], 10) + 1;
  const prevStart = parseInt(currentYear, 10) - prevNextShift;
  const nextStart = parseInt(currentYear, 10) + prevNextShift;

  const prevYear = anyYearActive && prevStart > MIN_YEAR && prevStart;
  const nextYear = anyYearActive && nextStart < MAX_YEAR && nextStart;
  const containerRef = useRef<HTMLElement>(null);
  const itemRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const handleChange = () => {
      if (containerRef?.current && itemRef?.current) {
        const containerWidth = Math.floor(
          containerRef.current.getBoundingClientRect().width
        );
        const itemWidth = Math.ceil(
          itemRef.current.getBoundingClientRect().width
        );
        const itemsCount = Math.floor(containerWidth / itemWidth);

        let lowerLimit =
          parseInt(currentYear, 10) - Math.ceil(itemsCount) / 2 + 2; // plus PREV & CURYEAR
        let upperLimit =
          parseInt(currentYear, 10) + Math.floor(itemsCount) / 2 - 1; // minus NEXT

        if (lowerLimit < MIN_YEAR) {
          lowerLimit = MIN_YEAR;
          upperLimit = MIN_YEAR + itemsCount - 3; // minus PREV & CURYEAR & NEXT
        }
        if (upperLimit > MAX_YEAR) {
          lowerLimit = MAX_YEAR - itemsCount + 3; // minus PREV & CURYEAR & NEXT
          upperLimit = MAX_YEAR;
        }
        setYearRange([String(lowerLimit), String(upperLimit)]);
      }
    };
    const handleResize = debounce(handleChange, 100);

    window.addEventListener("resize", handleResize);
    handleChange();
    return () => window.removeEventListener("resize", handleResize);
  }, [currentYear, containerRef, itemRef]);

  const years = R.pipe(
    R.range(parseInt(yearRange[0], 10), parseInt(yearRange[1], 10) + 1),
    R.map(String)
  );

  return (
    <nav className="grow overflow-hidden" ref={containerRef}>
      <LinkAnchor
        href={prevYear ? `/${prevYear}` : undefined}
        className="inline mx-1"
        important
        active={false}
      >
        prev
      </LinkAnchor>
      {R.map(years, (year) => (
        <span key={year} ref={year === currentYear ? itemRef : undefined}>
          <LinkAnchor
            href={`/${year}`}
            active={year === activeYear}
            className="mx-1"
            important
          >
            {year}
          </LinkAnchor>
        </span>
      ))}
      <LinkAnchor
        href={nextYear ? `/${nextYear}` : undefined}
        className="mx-1"
        important
        active={false}
      >
        next
      </LinkAnchor>
    </nav>
  );
}

function RangeNav({ activeYear }: { activeYear: string }) {
  const navigate = useNavigate();
  const [lowerYear, upperYear] = R.compact(activeYear.split("-", 2));

  const handleLowerYearChange = ({
    target: { value },
  }: {
    target: HTMLSelectElement;
  }) => {
    navigate(`/${value}-${upperYear < value ? value : upperYear}`);
  };
  const handleUpperYearChange = ({
    target: { value },
  }: {
    target: HTMLSelectElement;
  }) => {
    navigate(`/${lowerYear > value ? value : lowerYear}-${value}`);
  };

  return (
    <div>
      (
      <select onChange={handleLowerYearChange} className="mx-1 outline-none">
        {R.range(MIN_YEAR, MAX_YEAR + 1).map((value) => (
          <option key={value} selected={String(value) === lowerYear}>
            {value}
          </option>
        ))}
      </select>
      -
      <select onChange={handleUpperYearChange} className="mx-1 outline-none">
        {R.range(MIN_YEAR, MAX_YEAR + 1).map((value) => (
          <option key={value} selected={String(value) === upperYear}>
            {value}
          </option>
        ))}
      </select>
      )
    </div>
  );
}

export default function YearlyNav({ activeYear }: { activeYear?: string }) {
  const isDefaultNav = !activeYear || activeYear.indexOf("-") === -1;
  const isRangeNav = !isDefaultNav;
  const lowerYear = activeYear?.split("-")[0];

  return (
    <Block isNav hasBottomSeparator>
      <div className="flex max-w-full uppercase">
        <div className="mr-1">
          {isDefaultNav && (
            <LinkAnchor href={`/${activeYear}-${activeYear}`} important>
              Range
            </LinkAnchor>
          )}
          {isRangeNav && (
            <LinkAnchor href={`/${lowerYear}`} important>
              List
            </LinkAnchor>
          )}
        </div>
        {isDefaultNav && <DefaultNav activeYear={activeYear} />}
        {isRangeNav && <RangeNav activeYear={activeYear} />}
      </div>
    </Block>
  );
}
