import React from "react";
import { NextPageContext } from "next";
import { Page } from "components/layout";

function serverErrorMessage(statusCode: number): string {
  if (statusCode == 404) {
    return "Page not found";
  }

  return `Server error: #${statusCode}`;
}

type Props = {
  statusCode: number;
};

export default function ErrorPage({ statusCode }: Props) {
  return (
    <Page title={[`Error #${statusCode}`]}>
      <p className="mb-4">
        {statusCode ? serverErrorMessage(statusCode) : "Client error"}
      </p>
    </Page>
  );
}

// Must use getInitialProps as getServerSideProps does not work for error page
ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
