import React, { ReactNode } from "react";
import * as R from "remeda";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

type Props = {
  children: ReactNode;
  title: string[];
};

export default function Layout({ children, title }: Props) {
  return (
    <div className="text-sm md:text-base leading-relaxed">
      <Head>
        <title>
          {R.filter(title, (part) => !!part).join(" / ")} - Albicelestes
        </title>
        <link rel="shortcut icon" href="/favicon.png" />

        <meta
          name="description"
          content="Argentina football (soccer) national team archive. Matches, players, rival teams. Lineups, goals, statistics."
        />
        <meta
          name="keywords"
          content="albicelestes, archive, argentina, database, football, matches, national team, players, rival teams, soccer"
        />
      </Head>

      <NextNprogress
        color="#000"
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
      />

      <div className="max-w-2xl m-auto font-mono antialiased px-2">
        <SiteHeader />

        <div className="pt-4 px-1 border-t border-dotted">
          <div>{children}</div>
        </div>

        <p className="py-4 px-1 text-xs italic border-b border-dotted">
          Data has not been fully verified yet. You can help by reporting any
          errors or mistakes to przemek&#64;sobstel&#46;org.
        </p>

        <SiteFooter />
      </div>
    </div>
  );
}
