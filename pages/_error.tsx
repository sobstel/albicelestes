import React from "react";
import { NextPageContext } from "next";
import Layout from "components/Layout";

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

export async function getServerSideProps({ req, res, err }: NextPageContext) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (req && req.url && res && res.statusCode === 404) {
    const { url } = req;
    let regexMatch;

    // matches/[year]/[slug]/[id] => matches/[year]/[slug]
    regexMatch = url.match(/\/matches\/(?<year>\d+)\/(?<slug>[-\w]+)\/\w+/);
    if (regexMatch && regexMatch.groups) {
      res
        .writeHead(308, "Permanent Redirect", {
          Location: `/matches/${regexMatch.groups.year}/${regexMatch.groups.slug}`,
        })
        .end();
    }

    // players/[catalog]/[slug]/[id] => players/[catalog]/[slug]
    regexMatch = url.match(/\/players\/(?<catalog>\w)\/(?<slug>[-\w]+)\/\w+/);
    if (regexMatch && regexMatch.groups) {
      res
        .writeHead(308, "Permanent Redirect", {
          Location: `/players/${regexMatch.groups.catalog}/${regexMatch.groups.slug}`,
        })
        .end();
    }
  }

  return { props: { statusCode } };
}
