import * as R from "remeda";
import React, { ReactNode } from "react";
import Head from "next/head";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import Spinner from "./Spinner";

type Props = {
  children: ReactNode;
  title: string | Array<string>;
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

      <Spinner />

      <div className="max-w-2xl m-auto px-3 font-mono antialiased">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </div>
  );
}
