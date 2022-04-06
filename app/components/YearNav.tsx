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

export default function YearNav({ activeYear }: { activeYear?: string }) {
  const prevYear =
    activeYear &&
    activeYear > String(MIN_YEAR) &&
    `${parseInt(activeYear, 10) - 1}`;
  const nextYear =
    activeYear &&
    activeYear < String(MAX_YEAR) &&
    `${parseInt(activeYear, 10) + 1}`;

  const refYear = parseInt(activeYear ?? String(MAX_YEAR));

  const sideCount = 7;
  const leftOverflow = Math.abs(Math.min(refYear - sideCount - MIN_YEAR, 0));
  const rightOverflow = Math.abs(Math.min(MAX_YEAR - refYear - sideCount, 0));
  const [leftShift, setLeftShift] = useState(0);
  const [rightShift, setRightShift] = useState(0);

  const items = R.map(
    R.range(
      refYear - sideCount + leftOverflow - rightOverflow + leftShift,
      refYear + sideCount - rightOverflow + leftOverflow - rightShift + 1
    ),
    (year) => {
      return {
        id: String(year),
        href: `/${year}`,
        text: String(year),
      };
    }
  );

  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (ref.current && ref.current.scrollWidth > ref.current.offsetWidth) {
      if (leftOverflow === 0) {
        setLeftShift(leftShift + 1);
      }
      if (rightOverflow === 0) {
        setRightShift(rightShift + 1);
      }
    }
  }, [ref, leftShift, rightShift]);

  return (
    <Block isNav hasBottomSeparator>
      <div className="flex uppercase" ref={ref}>
        <div className="mr-2">
          <div title="Range filter is under construction">
            <LinkAnchor className="line-through">Range</LinkAnchor>
          </div>
        </div>
        <LinkAnchor
          href={prevYear ? `/${prevYear}` : undefined}
          className="mr-1"
          important
          active={false}
        >
          prev
        </LinkAnchor>
        {R.map(items, ({ id, href, text }) => (
          <LinkAnchor
            key={id}
            href={href}
            active={id === activeYear}
            className="inline-flex justify-end mx-1"
            important
          >
            {text}
          </LinkAnchor>
        ))}
        <LinkAnchor
          href={nextYear ? `/${nextYear}` : undefined}
          className="ml-1"
          important
          active={false}
        >
          next
        </LinkAnchor>
      </div>
    </Block>
  );
}
