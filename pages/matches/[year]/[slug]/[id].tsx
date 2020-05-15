import React from "react";
import * as R from "remeda";
import { useRouter } from "next/router";
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

type Context = { params: { id: string; year: string; slug: string } };

export async function getStaticProps(context: Context) {
  const { id } = context.params;

  const matches = fetchMatches();
  const idx = matches.findIndex((match) => match.id == id);

  const match = matches[idx];
  const prevMatch = matches[idx - 1] ? matchItem(matches[idx - 1]) : null;
  const nextMatch = matches[idx + 1] ? matchItem(matches[idx + 1]) : null;
  const info = fetchMatchInfo(match);

  return { props: { match, prevMatch, nextMatch, info } };
}

// FIXME: import all recent matches and all world cup matches
export async function getStaticPaths() {
  return {
    paths: R.pipe(
      fetchMatches(),
      R.reverse(),
      R.take(100),
      R.map((match) => ({
        params: {
          year: matchYear(match),
          slug: matchSlug(match),
          id: match.id,
        },
      }))
    ),
    fallback: true,
  };
}
