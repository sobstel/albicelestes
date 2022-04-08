import { up } from "inquirer/lib/utils/readline";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as R from "remeda";

import { Block, LinkAnchor } from "~/components/layout";
import { MAX_YEAR, MIN_YEAR } from "~/config";

// https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
const isBrowser = typeof window !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

const calculateYearRange = (
  currentYear: string,
  containerEl: HTMLElement | null,
  itemEl: HTMLElement | null
): [string, string] | undefined => {
  if (!containerEl || !itemEl) {
    return;
  }

  const containerWidth = Math.floor(containerEl.getBoundingClientRect().width);
  const itemWidth = Math.ceil(itemEl.getBoundingClientRect().width);
  const itemsCount = Math.floor(containerWidth / itemWidth);

  let lowerLimit = parseInt(currentYear, 10) - Math.ceil(itemsCount) / 2 + 2; // plus PREV & CURYEAR
  let upperLimit = parseInt(currentYear, 10) + Math.floor(itemsCount) / 2 - 1; // minus NEXT

  if (lowerLimit < MIN_YEAR) {
    lowerLimit = MIN_YEAR;
    upperLimit = MIN_YEAR + itemsCount - 2; // minus PREV & NEXT
  }
  if (upperLimit > MAX_YEAR) {
    lowerLimit = MAX_YEAR - itemsCount + 2; // minus PREV & NEXT
    upperLimit = MAX_YEAR;
  }

  return [String(lowerLimit), String(upperLimit)];
};

export default function YearNav({ activeYear }: { activeYear?: string }) {
  const currentYear = activeYear ?? String(MAX_YEAR);

  // TODO generate year list to exlucde empty years
  const prevYear =
    activeYear &&
    currentYear > String(MIN_YEAR) &&
    `${parseInt(currentYear, 10) - 1}`;
  const nextYear =
    activeYear &&
    currentYear < String(MAX_YEAR) &&
    `${parseInt(currentYear, 10) + 1}`;

  const [yearRange, setYearRange] = useState<[string, string]>([
    currentYear,
    currentYear,
  ]);

  const containerRef = useRef<HTMLElement>(null);
  const itemRef = useRef<HTMLElement>(null);

  function handleYearRangeChange(
    currentYear: string,
    containerEl: HTMLElement | null,
    itemEl: HTMLElement | null
  ) {
    const calculatedYearRange = calculateYearRange(
      currentYear,
      containerEl,
      itemEl
    );
    if (calculatedYearRange) {
      setYearRange(calculatedYearRange);
    }
  }

  useIsomorphicLayoutEffect(() => {
    function handleResize() {
      handleYearRangeChange(
        currentYear,
        containerRef?.current,
        itemRef?.current
      );
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useIsomorphicLayoutEffect(() => {
    handleYearRangeChange(currentYear, containerRef?.current, itemRef?.current);
  }, [currentYear, containerRef, itemRef]);

  const years = R.pipe(
    R.range(parseInt(yearRange[0], 10), parseInt(yearRange[1], 10) + 1),
    R.map(String)
  );

  return (
    <Block isNav hasBottomSeparator>
      <div className="flex max-w-full uppercase">
        <div className="mr-2">
          <div title="Range filter is under construction">
            <LinkAnchor className="line-through">Range</LinkAnchor>
          </div>
        </div>
        <nav className="grow overflow-hidden" ref={containerRef}>
          <LinkAnchor
            href={prevYear ? `/${prevYear}` : undefined}
            className="inline mr-1"
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
            className="ml-1"
            important
            active={false}
          >
            next
          </LinkAnchor>
        </nav>
      </div>
    </Block>
  );
}
