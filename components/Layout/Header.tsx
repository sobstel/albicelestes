import React from "react";
import { useRouter } from "next/router";
import Link from "./Link";

type Props = {
  text: string;
  top?: boolean;
  nav?: NavLinkProps[];
};

type NavLinkProps = { href: string; text: string };

const NavLink = ({ href, text }: NavLinkProps) => {
  const router = useRouter();
  if (router.asPath === href) {
    return <>{text}</>;
  }
  return <Link href={href}>{text}</Link>;
};

export default function Header({ text, top, nav }: Props) {
  const Hx = top ? "h1" : "h2";
  const className = top ? "" : "";
  return (
    <div className="flex items-center font-semibold uppercase mb-4">
      <Hx className={className}>{text}</Hx>
      {nav && (
        <>
          &nbsp;{">"}
          <ul className="inline-flex">
            {nav.map(({ href, text }) => (
              <li key={href} className="ml-2">
                <NavLink href={href} text={text} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
