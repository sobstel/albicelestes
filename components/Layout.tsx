import Head from "next/head";
import "../style.css";

type Props = any;

interface NavLinkProps {
  last?: boolean;
  children: string;
  href: string;
}

const NavLink = (props: NavLinkProps) => {
  let className = "inline-block text-blue-200 hover:text-white lowercase";

  // TODO: active href based on window.location

  if (!props.last) {
    className += " mr-4";
  }

  return (
    <a href={props.href} className={className}>
      {props.children}
    </a>
  );
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
            <NavLink href="">Fixtures</NavLink>
            <NavLink href="">Archive</NavLink>
            <NavLink href="">Players</NavLink>
            <NavLink href="" last>
              Chants
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
