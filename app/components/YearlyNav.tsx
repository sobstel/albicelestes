import debounce from "lodash.debounce";
import React, {
  ChangeEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import * as R from "remeda";

import { Block, LinkAnchor } from "~/components/layout";
import { MAX_YEAR, MIN_YEAR } from "~/config";

// https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
const isBrowser = typeof window !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

const Select = ({
  values,
  selectedValue,
  handleChange,
  unselectedOptionText,
}: {
  values: Array<string>;
  selectedValue?: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  unselectedOptionText?: string;
}) => {
  return (
    <select
      onChange={handleChange}
      className="mx-1 outline-none disabled:text-slate-400"
      disabled={values.length === 0}
    >
      {unselectedOptionText && <option>{unselectedOptionText}</option>}
      {values.map((value) => (
        <option key={value} selected={value === selectedValue}>
          {value}
        </option>
      ))}
    </select>
  );
};

function DefaultNav({ activeYear }: { activeYear?: string }) {
  const navigate = useNavigate();
  const currentYear = activeYear ?? String(MAX_YEAR);

  const [yearRange, setYearRange] = useState<[string, string]>([
    currentYear,
    currentYear,
  ]);
  const currentYearInt = parseInt(currentYear, 10);

  const containerRef = useRef<HTMLElement>(null);
  const itemRef = useRef<HTMLElement>(null);
  const lowerSelectRef = useRef<HTMLSelectElement>(null);
  const upperSelectRef = useRef<HTMLSelectElement>(null);

  useIsomorphicLayoutEffect(() => {
    const handleChange = () => {
      if (
        containerRef?.current &&
        itemRef?.current &&
        lowerSelectRef?.current &&
        upperSelectRef?.current
      ) {
        const containerWidth = Math.floor(
          containerRef.current.getBoundingClientRect().width
        );
        const itemWidth =
          Math.ceil(itemRef.current.getBoundingClientRect().width) + 8; // margin
        const selectsWidth =
          Math.ceil(lowerSelectRef.current.getBoundingClientRect().width) +
          Math.ceil(upperSelectRef.current.getBoundingClientRect().width);

        const itemsCount = Math.floor(
          (containerWidth - selectsWidth) / itemWidth
        );

        let lowerLimit = parseInt(currentYear, 10) - Math.ceil(itemsCount) / 2;
        let upperLimit = parseInt(currentYear, 10) + Math.floor(itemsCount) / 2;

        if (lowerLimit < MIN_YEAR) {
          lowerLimit = MIN_YEAR;
          upperLimit = MIN_YEAR + itemsCount;
        }
        if (upperLimit > MAX_YEAR) {
          lowerLimit = MAX_YEAR - itemsCount;
          upperLimit = MAX_YEAR;
        }
        setYearRange([String(lowerLimit), String(upperLimit)]);
      }
    };
    const handleResize = debounce(handleChange, 100);

    window.addEventListener("resize", handleResize);
    handleChange();
    return () => window.removeEventListener("resize", handleResize);
  }, [currentYear, containerRef, itemRef, lowerSelectRef, upperSelectRef]);

  const handleYearChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    navigate(`/${value}`);
  };

  return (
    <nav className="grow overflow-hidden flex" ref={containerRef}>
      <span ref={lowerSelectRef}>
        <Select
          values={R.pipe(
            R.range(MIN_YEAR, parseInt(yearRange[0])),
            R.map(String),
            R.reverse()
          )}
          handleChange={handleYearChange}
          unselectedOptionText="PREV"
        />
      </span>
      {R.pipe(
        R.range(parseInt(yearRange[0], 10), currentYearInt),
        R.map((year) => (
          <LinkAnchor key={year} href={`/${year}`} className="mx-1" important>
            {year}
          </LinkAnchor>
        ))
      )}
      <span ref={itemRef}>
        <LinkAnchor
          key={currentYearInt}
          href={`/${currentYear}`}
          className="mx-1"
          active={Boolean(activeYear)}
          important
        >
          {currentYear}
        </LinkAnchor>
      </span>
      {R.pipe(
        R.range(currentYearInt + 1, parseInt(yearRange[1], 10) + 1),
        R.map((year) => (
          <LinkAnchor key={year} href={`/${year}`} className="mx-1" important>
            {year}
          </LinkAnchor>
        ))
      )}
      <span ref={upperSelectRef}>
        <Select
          values={R.pipe(
            R.range(parseInt(yearRange[1]) + 1, MAX_YEAR + 1),
            R.map(String)
          )}
          handleChange={handleYearChange}
          unselectedOptionText="NEXT"
        />
      </span>
    </nav>
  );
}

function RangeNav({ activeYear }: { activeYear?: string }) {
  const navigate = useNavigate();
  const activeYearParts = activeYear?.split("-", 2);
  const lowerYear = activeYearParts?.[0] ?? String(MAX_YEAR);
  const upperYear = activeYearParts?.[1] ?? String(MAX_YEAR);

  const handleLowerYearChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    navigate(`/${value}-${upperYear < value ? value : upperYear}`);
  };
  const handleUpperYearChange: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    navigate(`/${lowerYear > value ? value : lowerYear}-${value}`);
  };

  const values = R.range(MIN_YEAR, MAX_YEAR + 1).map(String);

  return (
    <div className="flex">
      <Select
        values={values}
        selectedValue={lowerYear}
        handleChange={handleLowerYearChange}
      />
      -
      <Select
        values={values}
        selectedValue={upperYear}
        handleChange={handleUpperYearChange}
      />
    </div>
  );
}

export default function YearlyNav({ activeYear }: { activeYear?: string }) {
  const isDefaultNavActive = activeYear?.indexOf("-") === -1;
  const isRangeNavActive = activeYear && activeYear?.indexOf("-") >= 0;

  return (
    <Block isNav hasBottomSeparator>
      <div className="flex max-w-full uppercase">
        <RangeNav
          activeYear={
            isRangeNavActive
              ? activeYear
              : isDefaultNavActive
              ? `${activeYear}-${activeYear}`
              : `${MAX_YEAR}-${MAX_YEAR}`
          }
        />
        <DefaultNav activeYear={isDefaultNavActive ? activeYear : undefined} />
      </div>
    </Block>
  );
}
