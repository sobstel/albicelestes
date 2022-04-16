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
}: {
  values: Array<string>;
  selectedValue?: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <select
      onChange={handleChange}
      className="mx-1 outline-none"
      disabled={values.length === 0}
    >
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
          upperLimit = MIN_YEAR + itemsCount - 1; // - CURYEAR
        }
        if (upperLimit > MAX_YEAR) {
          lowerLimit = MAX_YEAR - itemsCount + 1; // + CURYEAR
          upperLimit = MAX_YEAR;
        }

        console.log({
          containerWidth,
          itemWidth,
          selectsWidth,
          itemsCount,
          lowerLimit,
          upperLimit,
        });

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
          selectedValue={String(parseInt(yearRange[0]) - 1)}
          handleChange={handleYearChange}
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
          selectedValue={String(parseInt(yearRange[1]) + 1)}
          handleChange={handleYearChange}
        />
      </span>
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

  const values = R.range(MIN_YEAR, MAX_YEAR).map(String);

  return (
    <div>
      (
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
      )
    </div>
  );
}

export default function YearlyNav({ activeYear }: { activeYear?: string }) {
  const isDefaultNav = !activeYear || activeYear.indexOf("-") === -1;
  const isRangeNav = !isDefaultNav;
  const lowerYear = activeYear?.split("-")[0];
  const currentYear = activeYear ?? String(MAX_YEAR);

  return (
    <Block isNav hasBottomSeparator>
      <div className="flex max-w-full uppercase">
        <div className="mr-1">
          {isDefaultNav && (
            <LinkAnchor href={`/${currentYear}-${currentYear}`} important>
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
