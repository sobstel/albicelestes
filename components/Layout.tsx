import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import "../style.css";

type Props = any;

interface NavLinkProps {
  href: string;
  as: string;
  last?: boolean;
  children: string;
  router: any;
}

const NavLink = withRouter(
  ({ href, as, last, children, router }: NavLinkProps) => {
    const classNames = ["inline-block", "lowercase"];

    classNames.push(
      router.asPath === href || router.asPath === as
        ? "text-white"
        : "text-blue-200 hover:text-white"
    );

    if (!last) {
      classNames.push("mr-4");
    }

    return (
      <Link href={href} as={as}>
        <a className={classNames.join(" ")}>{children}</a>
      </Link>
    );
  }
);

NavLink.defaultProps = {
  last: false
};

export default (props: Props) => {
  return (
    <div>
      <Head>
        <title>Albicelestes - ¡Vamos Argentina! 🇦🇷</title>
      </Head>

      <div className="max-w-2xl m-auto font-mono text-sm md:text-base">
        <div className="bg-gray-100">
          <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-5">
            <div className="text-white mr-6">
              <Link href="/index" as="/">
                <a className="font-semibold text-2xl uppercase">Albicelestes</a>
              </Link>
            </div>
            <div className="flex-grow">
              {/* <NavLink href="/index" as="/" last>
              </NavLink> */}
              <NavLink href="/expats" as="expats">Expats</NavLink>
            </div>
          </nav>

          <div className="p-5">{props.children}</div>
        </div>

        <footer className="text-xs opacity-50 p-5">
          created with 💙 for 🇦🇷 by{" "}
          <a
            className="text-blue-600 hover:text-black"
            href="https://sobstel.org"
          >
            sobstel
          </a>
        </footer>
      </div>
    </div>
  );
  return props.children;
};
