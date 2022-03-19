import * as R from "remeda";
import React, { ReactNode } from "react";
// import Head from "next/head";
import PageHeader from "./PageHeader";
import PageFooter from "./PageFooter";
import Spinner from "./Spinner";

type Props = {
  children: ReactNode;
  title: string | Array<string>;
};

export default function Layout({ children, title }: Props) {
  const formattedTitle = Array.isArray(title)
    ? R.filter(title, (part) => Boolean(part)).join(" / ")
    : title;

  return (
    <div className="text-xs md:text-sm leading-relaxed">
      <Spinner />

      <div className="max-w-2xl m-auto px-3 font-mono antialiased">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </div>
  );
}
