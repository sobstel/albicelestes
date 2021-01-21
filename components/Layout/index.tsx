import React, { ReactNode } from "react";
import * as R from "remeda";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

type Props = {
  children: ReactNode;
  title: string[];
  description?: string;
  canonicalPath?: string;
};

export default function Layout({
  children,
  title,
  description,
  canonicalPath,
}: Props) {
  return (
    <div className="text-xs md:text-sm leading-relaxed">
      <Head>
        <title>
          {R.filter(title, (part) => !!part).join(" / ")} / Albicelestes
        </title>
        <link rel="shortcut icon" href="/favicon.png" />
        {description && <meta name="description" content={description} />}
        {canonicalPath && <link rel="canonical" href={canonicalPath} />}
      </Head>

      <NextNprogress
        color="#000"
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
      />

      <div className="max-w-2xl m-auto px-3 font-mono antialiased">
        <SiteHeader />

        <div className="-mx-1 px-1">
          <div>{children}</div>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
}
