import React from "react";
import * as R from "remeda";
import { useRouter } from "next/router";
import { MAX_YEAR } from "config";
import { fetchMatches } from "data";
import { getMatchItem, getMatchSlug, getMatchYear } from "helpers";
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
    (match) => getMatchYear(match) === year && getMatchSlug(match) === slug
  );

  const match = matches[idx];
  const prevMatch = matches[idx - 1] ? getMatchItem(matches[idx - 1]) : null;
  const nextMatch = matches[idx + 1] ? getMatchItem(matches[idx + 1]) : null;

  return { props: { match, prevMatch, nextMatch } };
}

export async function getStaticPaths() {
  return {
    paths: R.pipe(
      fetchMatches(),
      R.reverse(),
      R.filter(
        (match) =>
          getMatchYear(match) >= String(MAX_YEAR - 4) ||
          /World Cup|Copa America/i.test(match.competition)
      ),
      R.take(500),
      R.map((match) => ({
        params: {
          year: getMatchYear(match),
          slug: getMatchSlug(match),
        },
      }))
    ),
    fallback: true,
  };
}
