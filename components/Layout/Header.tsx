import React from "react";
import { useRouter } from "next/router";
import Link from "./Link";

type Props = {
  text: string;
  top?: boolean;
  nav?: NavLinkProps[];
};

export default function Header({ text, top, nav }: Props) {
  const router = useRouter();
  const Hx = top ? "h1" : "h2";
  const className = top ? "" : "";
  return (
    <div className="flex items-center font-semibold uppercase my-4">
      <Hx className={className}>{text}</Hx>
      {nav && (
        <>
          &nbsp;{">"}
          <ul className="inline-flex">
            {nav.map(({ href, text }) => (
              <li key={href} className="ml-2">
                <Link href={href} active={router.asPath === href}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
