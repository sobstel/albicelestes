import React from "react";
import * as R from "remeda";
import { useRouter } from "next/router";
import Page, { Props } from "components/Page/Player";
import { fetchMatches, fetchPlayerInfo } from "db";
import { matchItem, playerCatalog, playerSlug } from "helpers";
import {
  collectCompetitions,
  collectPlayerStat,
  collectPlayers,
  findPlayerName,
  sortByMatchesPlayed,
} from "functions";

export default function PageContainer(props: Props) {
  const router = useRouter();
  if (router.isFallback) {
    // FIXME: have some loading component (or skeleton)
    return <div>Loading...</div>;
  }

  return <Page {...props} />;
}

type Context = { params: { catalog: string; slug: string } };

export async function getStaticProps(context: Context) {
  const { slug } = context.params;

  const matches = R.filter(
    fetchMatches(),
    (match) =>
      !!R.find(R.flatten(match.lineups), (app) => playerSlug(app.name) === slug)
  );

  const name = findPlayerName(matches, slug);
  const competitions = collectCompetitions(matches);
  const stat = collectPlayerStat(matches, slug);
  const info = fetchPlayerInfo(name, slug);

  return {
    props: {
      slug,
      name,
      matches: matches.map(matchItem),
      competitions,
      stat,
      info,
    },
  };
}

export async function getStaticPaths() {
  const paths = R.pipe(
    fetchMatches(),
    collectPlayers,
    sortByMatchesPlayed,
    R.take(100),
    R.map((player) => ({
      params: {
        catalog: playerCatalog(player.name),
        slug: playerSlug(player.name),
      },
    }))
  );

  return { paths, fallback: true };
}
