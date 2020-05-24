import React from "react";
import * as R from "remeda";
import Error from "next/error";
import { useRouter } from "next/router";
import Page, { Props } from "components/Page/Player";
import { fetchMatches, fetchPlayerInfo } from "db";
import { matchItem, matchTeamIndex, playerCatalog, playerSlug } from "helpers";
import {
  collectCompetitions,
  collectPlayerStat,
  collectPlayers,
  findNearestPlayerSlug,
  findPlayerName,
  sortByMatchesPlayed,
} from "functions";

export default function PageContainer(
  props: Props & { errorCode: number | null }
) {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  const router = useRouter();
  if (router.isFallback) {
    // FIXME: have some loading component (or skeleton)
    return <div>Loading...</div>;
  }

  return <Page {...R.omit(props, ["errorCode"])} />;
}

type Context = { params: { catalog: string; slug: string } };

export async function getStaticProps(context: Context) {
  const { slug: rawSlug } = context.params;

  const matches = fetchMatches();
  const slug = findNearestPlayerSlug(matches, rawSlug);

  if (!slug) {
    return {
      props: { errorCode: 404 },
    };
  }

  const playerMatches = R.filter(matches, (match) =>
    match.lineups[matchTeamIndex(match)].some(
      (app) => playerSlug(app.name) === slug
    )
  );

  const name = findPlayerName(playerMatches, slug);
  const competitions = collectCompetitions(playerMatches);
  const stat = collectPlayerStat(playerMatches, slug);
  const info = fetchPlayerInfo(name, slug);

  return {
    props: {
      slug,
      name,
      matches: playerMatches.map(matchItem),
      competitions,
      stat,
      info,
      errorCode: null,
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
