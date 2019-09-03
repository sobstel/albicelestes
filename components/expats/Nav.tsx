import moment from "moment";
import Link from "next/link";

interface NavProps {
  date: string;
}

interface NavLinkProps {
  date: string;
  days?: number;
}

function relativeDate(date: string, days: number) {
  if (days === 0) {
    return date;
  }

  return moment(date)
    .add(days, "days")
    .format("YYYY-MM-DD");
}

function NavLink({ date, days }: NavLinkProps) {
  const linkDate = relativeDate(date, days || 0);
  const today = moment().format("YYYY-MM-DD");
  if (linkDate > today) {
    return null;
  }

  const textColor =
    date === linkDate ? "text-black" : "text-blue-600 hover:text-blue-900";

  return (
    <li className="mr-4">
      <Link href={`/expats?date=${linkDate}`} as={`/expats/${linkDate}`}>
        <a className={`font-semibold uppercase ${textColor}`}>{linkDate}</a>
      </Link>
    </li>
  );
}

function Nav({ date }: NavProps) {
  return (
    <ul className="flex mb-4">
      <NavLink date={date} days={-2} />
      <NavLink date={date} days={-1} />
      <NavLink date={date} />
      <NavLink date={date} days={1} />
      <NavLink date={date} days={2} />
    </ul>
  );
}

export default Nav;
