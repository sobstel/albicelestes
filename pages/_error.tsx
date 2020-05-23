import React from "react";
import { NextPageContext } from "next";
import Layout from "components/Layout";
import { createContextRedirect } from "utility/redirection";

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

// Must use getInitialProps as getServerSideProps does not work for error page
ErrorPage.getInitialProps = ({ req, res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  const redirect = createContextRedirect(req, res);

  redirect(
    /\/matches\/(?<year>\d+)\/(?<slug>[-\w]+)\/\w+/,
    ({ year, slug }) => `/matches/${year}/${slug}`
  );

  redirect(
    /\/players\/(?<catalog>\w)\/(?<slug>[-\w]+)\/\w+/,
    ({ catalog, slug }) => `/players/${catalog}/${slug}`
  );

  return { statusCode };
};
