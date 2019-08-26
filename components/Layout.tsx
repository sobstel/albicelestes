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

      <div className="container font-mono bg-gray-100">
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-5">
          <div className="text-white mr-6">
            <span className="font-semibold text-xl uppercase">
              Albicelestes
            </span>
          </div>
          <div className="flex-grow">
            <NavLink href="/index" as="/" last>
              Fixtures
            </NavLink>
          </div>
        </nav>

        <div className="p-5">{props.children}</div>
      </div>

      <footer className="container font-mono text-xs opacity-50 p-5">
        created with 💙 for 🇦🇷 by{" "}
        <a
          className="text-blue-600 hover:text-black"
          href="https://sobstel.org"
        >
          sobstel
        </a>
      </footer>

      <style jsx>{`
        .container {
          max-width: 666px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
  return props.children;
};
