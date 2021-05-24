import * as R from "remeda";
import pluralize from "pluralize";
import stringSimilarity from "string-similarity";
import React from "react";
import { useRouter } from "next/router";
import { fetchMatches, fetchPlayerInfo } from "data";
import {
  getMatchDate,
  getMatchItem,
  getMatchScore,
  getMatchTeamIndex,
  getMatchTeams,
  getPlayerCatalog,
  getPlayerSlug,
} from "helpers";
import {
  collectPlayerStat,
  collectPlayers,
  findNearestPlayerSlug,
  findPlayerName,
} from "helpers";
import { MatchItem, PlayerInfo, PlayerItem, PlayerStat } from "types";
import { Page, Block, Header } from "components/layout";
import MatchList from "components/MatchList";
import InfoLinks from "components/InfoLinks";
import PlayerList from "components/PlayerList";

type Context = { params: { catalog: string; slug: string } };

export type Props = {
  slug: string;
  name: string;
  stat: PlayerStat;
  matches: Array<MatchItem>;
  info: PlayerInfo;
};

export type ErrorProps = { errorCode: number; players: Array<PlayerItem> };

export async function getStaticProps(
  context: Context
): Promise<{ props: Props | ErrorProps }> {
  const { slug: rawSlug } = context.params;

  const matches = fetchMatches();
  const slug = findNearestPlayerSlug(matches, rawSlug);

  if (!slug) {
    const suggestedPlayers = R.pipe(
      matches,
      collectPlayers,
      R.sortBy((player) => {
        return -stringSimilarity.compareTwoStrings(
          rawSlug,
          getPlayerSlug(player.name)
        );
      }),
      R.take(10)
    );

    return {
      props: { errorCode: 404, players: suggestedPlayers },
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
    props: {
      slug,
      name,
      matches: playerMatches.map(getMatchItem),
      stat,
      info,
    },
  };
}

export async function getStaticPaths() {
  const paths = R.pipe(
    fetchMatches(),
    collectPlayers,
    R.filter((player) => player.mp >= 10),
    R.map((player) => ({
      params: {
        catalog: getPlayerCatalog(player.name),
        slug: getPlayerSlug(player.name),
      },
    }))
  );

  return { paths, fallback: true };
}

function statPhrase({ mp, si, so, g, yc, rc }: PlayerStat) {
  return R.compact([
    pluralize("match", mp, true),
    `(${so} out, ${si} in)`,
    pluralize("goal", g, true),
    yc > 0 && `${yc}Y`,
    rc > 0 && `${rc}R`,
  ]).join(" ");
}

function generateDescription({
  name,
  stat,
  matches,
}: Pick<Props, "name" | "stat" | "matches">) {
  const lastMatch = R.last(matches);
  return [
    `${name} matches played for Argentina football national team`,
    statPhrase(stat),
    lastMatch &&
      [
        getMatchDate(lastMatch, { withYear: true }),
        ": ",
        getMatchTeams(lastMatch),
        " ",
        getMatchScore(lastMatch),
        ` (${lastMatch.competition})...`,
      ].join(""),
  ].join(". ");
}

export default function PlayerPage(props: Props | ErrorProps) {
  if ("errorCode" in props) {
    return (
      <Page title="Player not found">
        <Header text="Suggested players" />
        <PlayerList players={props.players} />
      </Page>
    );
  }

  const { name, stat, matches, info } = props;

  const router = useRouter();
  if (router.isFallback) {
    // FIXME: have some loading component (or skeleton)
    return (
      <Page title={"Loading"}>
        <div>Loading...</div>
      </Page>
    );
  }

  return (
    <Page
      title={name}
      description={generateDescription({ name, stat, matches })}
    >
      <Header text={name} top />
      <p className="mb-4">{statPhrase(stat)}</p>
      <MatchList matches={matches} />
      {info.nicknames && (
        <Block>
          <Header text="Nickname(s)" />
          {info.nicknames.join(", ")}
        </Block>
      )}
      <InfoLinks links={info.links} />
    </Page>
  );
}
