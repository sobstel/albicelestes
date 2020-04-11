import React from "react";
import { NextPageContext } from "next";
import Layout from "../components/Layout";

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
    <Layout title={[`Error #${statusCode}`]}>
      <p className="mb-4">
        {statusCode ? serverErrorMessage(statusCode) : "Client error"}
      </p>
    </Layout>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
