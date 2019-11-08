import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

function NavLink({ year, shift = 0, text = null }) {
  const linkYear = parseInt(year) + shift;
  if (linkYear < 1902 || linkYear > CURRENT_YEAR) {
    return null;
  }

  const textColor =
    shift === 0 ? "text-black" : "text-blue-600 hover:text-blue-400";

  return (
    <li className="mr-4">
      <Link href={`/archive/${linkYear}`}>
        <a className={`font-semibold uppercase ${textColor}`}>
          {text || linkYear}
        </a>
      </Link>
    </li>
  );
}

function Nav({ year }) {
  return (
    <ul className="flex mb-4">
      <NavLink year={year} shift={-1} text="prev" />
      <NavLink year={year} shift={-2} />
      <NavLink year={year} shift={-1} />
      <NavLink year={year} />
      <NavLink year={year} shift={1} />
      <NavLink year={year} shift={2} />
      <NavLink year={year} shift={1} text="next" />
    </ul>
  );
}

export default Nav;
