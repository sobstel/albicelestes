import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import type { LoaderFunction, MetaFunction } from "remix";
import { json, useLoaderData } from "remix";
import stringSimilarity from "string-similarity";

import InfoLinks from "~/components/InfoLinks";
import { Block, Header } from "~/components/layout";
import MatchList from "~/components/MatchList";
import PlayerList from "~/components/PlayerList";
import { fetchMatches, fetchPlayerInfo } from "~/data";
import {
  getMatchDate,
  getMatchItem,
  getMatchTeamIndex,
  getMatchTeams,
  getPlayerSlug,
} from "~/helpers";
import {
  collectPlayers,
  collectPlayerStat,
  findNearestPlayerSlug,
  findPlayerName,
} from "~/helpers";
import { PlayerStat } from "~/types";
import { seoDescription, seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({ params }: Parameters<LoaderFunction>[0]) {
  const { slug: rawSlug } = params;

  const matches = fetchMatches();
  const slug = findNearestPlayerSlug(matches, String(rawSlug));

  if (!slug) {
    const suggestedPlayers = R.pipe(
      matches,
      collectPlayers,
      R.sortBy((player) => {
        return -stringSimilarity.compareTwoStrings(
          String(rawSlug),
          getPlayerSlug(player.name)
        );
      }),
      R.take(10)
    );

    return {
      errorCode: 404,
      players: suggestedPlayers,
    };
  }

  const playerMatches = R.pipe(
    matches,
    R.filter((match) =>
      match.lineups[getMatchTeamIndex(match)].some(
        (app) => getPlayerSlug(app.name) === slug
      )
    )
  );

  const name = findPlayerName(playerMatches, slug);
  const stat = collectPlayerStat(playerMatches, slug);
  const info = fetchPlayerInfo(name, slug);

  return {
    slug,
    name,
    matches: playerMatches.map(getMatchItem),
    stat,
    info,
  };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

function statPhrase({ mp, si, so, g, yc, rc }: PlayerStat) {
  return R.compact([
    pluralize("match", mp, true),
    `(${so} out, ${si} in)`,
    pluralize("goal", g, true),
    yc > 0 && `${yc}Y`,
    rc > 0 && `${rc}R`,
  ]).join(" ");
}

export const meta: MetaFunction = ({
  data: { name, matches, stat, errorCode },
}: {
  data: LoaderData;
}) => {
  const lastMatch = matches?.length ? R.last(matches) : undefined;

  if (errorCode) {
    return { title: seoTitle(["Player not found"]), description: "" };
  }

  return {
    title: seoTitle([name]),
    description: seoDescription([
      stat ? `Argentina: ${statPhrase(stat)}` : undefined,
      lastMatch
        ? [
            `Last match: ${getMatchDate(lastMatch, { withYear: true })}`,
            lastMatch.competition,
            getMatchTeams(lastMatch),
          ].join(", ")
        : undefined,
    ]),
  };
};

export default function PlayerPage() {
  const { errorCode, players, name, stat, matches, info } =
    useLoaderData<LoaderData>();

  if (errorCode) {
    return (
      <>
        <Header text="Player not found. Suggested other players." />
        <PlayerList players={players} />
      </>
    );
  }

  return (
    <
      // description={generateDescription({ name, stat, matches })}
    >
      <Header text={String(name)} top />
      {stat && <p className="mb-4">{statPhrase(stat)}</p>}
      {matches?.length && <MatchList matches={matches} />}
      {info?.nicknames && (
        <Block>
          <Header text="Nickname(s)" />
          {info.nicknames.join(", ")}
        </Block>
      )}
      {info && <InfoLinks links={info.links} />}
    </>
  );
}
