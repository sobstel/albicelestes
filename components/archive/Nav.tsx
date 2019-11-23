import { memoize, range, reverse, toNumber } from "lodash";
import { useState } from "react";
import Link from "next/link";

const currentYear = memoize(function() {
  return new Date().getFullYear();
});

interface MainNavLinkProps {
  year: string;
  shift?: number;
  onClick: any;
}

function MainNavLink({ year, shift, onClick }: MainNavLinkProps) {
  const linkYear = toNumber(year) + toNumber(shift || 0);
  if (linkYear < 1902 || linkYear > currentYear()) {
    return null;
  }

  return <NavLink year={linkYear} active={shift !== 0} onClick={onClick} />;
}

interface NavLinkProps {
  year: number;
  active: boolean;
  onClick: any;
}

function NavLink({ year, active, onClick }: NavLinkProps) {
  const textColor = active ? "text-blue-600 hover:text-blue-400" : "text-black";

  return (
    <li className="mr-4 inline-flex">
      <Link href="/archive/[year]" as={`/archive/${year}`}>
        <a className={`font-semibold uppercase ${textColor}`} onClick={onClick}>
          {year}
        </a>
      </Link>
    </li>
  );
}

function AllYears({
  currentYear,
  onClick
}: {
  currentYear: number;
  onClick: any;
}) {
  return (
    <ul className="mb-4">
      {reverse(range(1902, 2020)).map(year => (
        <NavLink year={year} active={currentYear !== year} onClick={onClick} />
      ))}
    </ul>
  );
}

function Nav({ year }: { year: string }) {
  const [allYears, setAllYears] = useState(false);

  function toggleAll() {
    allYears ? setAllYears(false) : setAllYears(true);
  }

  return (
    <>
      <ul className="flex mb-4">
        <li className="mr-4">
          <a
            className="cursor-pointer text-blue-600 hover:text-blue-400"
            onClick={toggleAll}
          >
            ...
          </a>
        </li>
        {range(-2, 3).map(shift => (
          <MainNavLink year={year} shift={shift} onClick={toggleAll} />
        ))}
      </ul>
      {allYears && (
        <AllYears currentYear={parseInt(year)} onClick={toggleAll} />
      )}
    </>
  );
}

export default Nav;
