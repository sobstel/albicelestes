import { memoize, range, reverse, toNumber } from "lodash";
import { useState } from "react";
import Link from "next/link";

const currentYear = memoize(function() {
  return new Date().getFullYear();
});

interface MainNavLinkProps {
  year: string;
  shift?: number;
}

function MainNavLink({ year, shift }: MainNavLinkProps) {
  const linkYear = toNumber(year) + toNumber(shift || 0);
  if (linkYear < 1902 || linkYear > currentYear()) {
    return null;
  }

  return <NavLink year={linkYear} active={shift !== 0} />;
}

interface NavLinkProps {
  year: number;
  active: boolean;
}

function NavLink({ year, active }: NavLinkProps) {
  const textColor = active ? "text-blue-600 hover:text-blue-400" : "text-black";

  return (
    <li className="mr-4 inline-flex">
      <Link href="/archive/[year]" as={`/archive/${year}`}>
        <a className={`font-semibold uppercase ${textColor}`}>{year}</a>
      </Link>
    </li>
  );
}

function AllYears() {
  return (
    <ul className="mb-4">
      {reverse(range(1902, 2019)).map(year => (
        <NavLink year={year} active />
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
            href="#"
            className="text-blue-600 hover:text-blue-400"
            onClick={toggleAll}
          >
            ...
          </a>
        </li>
        {range(-2, 3).map(shift => (
          <MainNavLink year={year} shift={shift} />
        ))}
      </ul>
      {allYears && <AllYears />}
    </>
  );
}

export default Nav;
