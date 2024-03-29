import React, { ReactNode } from "react";

import PageFooter from "./PageFooter";
import PageHeader from "./PageHeader";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="text-xs md:text-sm leading-relaxed">
      <div className="max-w-2xl m-auto px-3 font-mono antialiased">
        <PageHeader />
        {children}
        <PageFooter />
      </div>
    </div>
  );
}
