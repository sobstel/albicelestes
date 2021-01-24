import React, { ReactNode } from "react";
import * as R from "remeda";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";

type Props = {
  children: ReactNode;
  title: string | string[];
  description?: string;
};

export default function Layout({ children, title, description }: Props) {
  const formattedTitle = Array.isArray(title)
    ? R.filter(title, (part) => Boolean(part)).join(" / ")
    : title;

  return (
    <div className="text-xs md:text-sm leading-relaxed">
      <Head>
        <title>{formattedTitle} / Albicelestes</title>
        <link rel="shortcut icon" href="/favicon.png" />
        {description && <meta name="description" content={description} />}
      </Head>

      <NextNprogress
        color="#000"
        startPosition={0.3}
        stopDelayMs={200}
        height="3"
      />

      <div className="max-w-2xl m-auto px-3 font-mono antialiased">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </div>
  );
}
