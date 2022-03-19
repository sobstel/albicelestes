import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, useLoaderData } from "remix";
import stringSimilarity from "string-similarity";

import InfoLinks from "~/components/InfoLinks";
import { Block, Header, Page } from "~/components/layout";
import MatchList from "~/components/MatchList";
import PlayerList from "~/components/PlayerList";
import { fetchMatches, fetchPlayerInfo } from "~/data";
import { getMatchItem, getMatchTeamIndex, getPlayerSlug } from "~/helpers";
import {
  collectPlayers,
  collectPlayerStat,
  findNearestPlayerSlug,
  findPlayerName,
} from "~/helpers";
import { PlayerStat } from "~/types";

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

// function generateDescription({
//   name,
//   stat,
//   matches,
// }: Pick<Props, "name" | "stat" | "matches">) {
//   const lastMatch = R.last(matches);
//   return [
//     `${name} matches played for Argentina football national team`,
//     statPhrase(stat),
//     lastMatch &&
//       [
//         getMatchDate(lastMatch, { withYear: true }),
//         ": ",
//         getMatchTeams(lastMatch),
//         " ",
//         getMatchScore(lastMatch),
//         ` (${lastMatch.competition})...`,
//       ].join(""),
//   ].join(". ");
// }

export default function PlayerPage() {
  const { errorCode, players, name, stat, matches, info } =
    useLoaderData<LoaderData>();

  if (errorCode) {
    return (
      <Page title="Player not found">
        <Header text="Suggested players" />
        <PlayerList players={players} />
      </Page>
    );
  }

  return (
    <Page
      title={String(name)}
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
    </Page>
  );
}
