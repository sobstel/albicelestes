import React from "react";
import * as R from "remeda";
import { useRouter } from "next/router";
import { MAX_YEAR } from "config";
import { fetchMatches, fetchMatchInfo } from "db";
import { matchItem, matchSlug, matchYear } from "helpers";
import Page, { Props } from "components/Page/Match";

export default function PageContainer(props: Props) {
  const router = useRouter();
  if (router.isFallback) {
    // FIXME: have some loading component
    return <div>Loading...</div>;
  }

  return <Page {...props} />;
}

type Context = { params: { year: string; slug: string } };

export async function getStaticProps(context: Context) {
  const { year, slug } = context.params;

  const matches = fetchMatches();
  const idx = matches.findIndex(
    (match) => matchYear(match) === year && matchSlug(match) === slug
  );

  const match = matches[idx];
  const prevMatch = matches[idx - 1] ? matchItem(matches[idx - 1]) : null;
  const nextMatch = matches[idx + 1] ? matchItem(matches[idx + 1]) : null;
  const info = fetchMatchInfo(match);

  return { props: { match, prevMatch, nextMatch, info } };
}

export async function getStaticPaths() {
  return {
    paths: R.pipe(
      fetchMatches(),
      R.reverse(),
      R.filter(
        (match) =>
          matchYear(match) >= String(MAX_YEAR - 4) ||
          match.competition === "World Cup" ||
          match.competition === "Copa America"
      ),
      R.take(500),
      R.map((match) => ({
        params: {
          year: matchYear(match),
          slug: matchSlug(match),
        },
      }))
    ),
    fallback: true,
  };
}
