import Link from "next/link";

function Nav({ catalog }: { catalog?: string }) {
  return (
    <ul className="mb-4">
      {"abcdefghijklmnopqrstuvwyz".split("").map(localCatalog => {
        const textColor =
          catalog !== localCatalog
            ? "text-blue-600 hover:text-blue-400"
            : "text-black";
        return (
          <li className="mr-4 inline-flex">
            <Link href="/players/[catalog]" as={`/players/${localCatalog}`}>
              <a className={`${textColor} font-semibold uppercase`}>
                {localCatalog}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Nav;
