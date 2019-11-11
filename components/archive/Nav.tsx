import { memoize, toNumber } from "lodash";
import Link from "next/link";

const currentYear = memoize(function() {
  return new Date().getFullYear();
});

interface NavLinkProps {
  year: string;
  shift?: number;
  text?: string;
}

function NavLink({ year, shift, text }: NavLinkProps) {
  const linkYear = toNumber(year) + toNumber(shift || 0);
  if (linkYear < 1902 || linkYear > currentYear()) {
    return null;
  }

  const textColor = shift ? "text-black" : "text-blue-600 hover:text-blue-400";

  return (
    <li className="mr-4">
      <Link href="/archive/[year]" as={`/archive/${linkYear}`}>
        <a className={`font-semibold uppercase ${textColor}`}>
          {text || linkYear}
        </a>
      </Link>
    </li>
  );
}

function Nav({ year }: { year: string }) {
  return (
    <ul className="flex mb-4">
      <NavLink year={year} shift={-2} />
      <NavLink year={year} shift={-1} />
      <NavLink year={year} />
      <NavLink year={year} shift={1} />
      <NavLink year={year} shift={2} />
    </ul>
  );
}

export default Nav;
