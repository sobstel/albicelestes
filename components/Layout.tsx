import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";
import "style.css";

interface NavLinkProps {
  href: string;
  as: string;
  last?: boolean;
  children: string;
  router: any;
}

const NavLink = withRouter(({ href, as, last, children }: NavLinkProps) => {
  const classNames = [
    "inline-block",
    "lowercase",
    "text-blue-200 hover:text-white"
  ];

  if (!last) {
    classNames.push("mr-4");
  }

  return (
    <Link href={href} as={as}>
      <a className={classNames.join(" ")}>{children}</a>
    </Link>
  );
});

NavLink.defaultProps = {
  last: false
};

interface Props {
  children: any;
  title: string;
}

export default ({ children, title }: Props) => {
  return (
    <div>
      <Head>
        <title>{title} | Albicelestes 🇦🇷</title>
        <link rel="shortcut icon" href="/static/favicon.png" />
      </Head>

      <NextNprogress
        color="#000"
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
      />

      <div className="max-w-2xl m-auto font-mono antialiased text-sm md:text-base">
        <div className="bg-gray-100">
          <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-5">
            <div className="text-white mr-6">
              <Link href="/" as="/">
                <a className="font-semibold text-2xl uppercase">Albicelestes</a>
              </Link>
            </div>
            <div className="flex-grow">
              <NavLink
                href="/matches/[year]"
                as={`/matches/${moment().format("YYYY")}`}
              >
                Matches
              </NavLink>
              <NavLink
                href="/expats/[date]"
                as={`/expats/${moment().format("YYYY-MM-DD")}`}
                last
              >
                Expats
              </NavLink>
            </div>
          </nav>

          <div className="p-5">{children}</div>
        </div>

        <footer className="text-xs opacity-50 p-5 clearfix">
          <p className="float-left">
            created with 💙 for 🇦🇷 by{" "}
            <a
              className="text-blue-600 hover:text-black"
              href="https://sobstel.org"
            >
              sobstel
            </a>
          </p>
          <p className="float-right">
            <Link href="/links" as="/links" prefetch={false}>
              <a className="text-blue-600 hover:text-black">links</a>
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};
