import * as R from "remeda";
import pluralize from "pluralize";
import React from "react";
import Error from "next/error";
import { useRouter } from "next/router";
import { fetchMatches, fetchPlayerInfo } from "data";
import {
  getMatchDate,
  getMatchItem,
  getMatchScore,
  getMatchTeamIndex,
  getPlayerCatalog,
  getPlayerSlug,
} from "helpers";
import {
  collectPlayerStat,
  collectPlayers,
  findNearestPlayerSlug,
  findPlayerName,
} from "helpers";
import { MatchItem, PlayerInfo, PlayerStat } from "types";
import { Page, Block, Header } from "components/layout";
import Fixtures from "components/Fixtures";
import InfoLinks from "components/InfoLinks";

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

  const playerMatches = R.pipe(
    matches,
    R.filter((match) =>
      match.lineups[getMatchTeamIndex(match)].some(
        (app) => getPlayerSlug(app.name) === slug
      )
    ),
    R.reverse()
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
      errorCode: null,
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

export type Props = {
  slug: string;
  name: string;
  stat: PlayerStat;
  matches: MatchItem[];
  info: PlayerInfo;
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
        getMatchScore(lastMatch),
        ` (${lastMatch.competition})...`,
      ].join(""),
  ].join(". ");
}

export default function PlayerPage({
  name,
  stat,
  matches,
  info,
  errorCode,
}: Props & { errorCode: number | null }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const router = useRouter();
  if (router.isFallback) {
    // FIXME: have some loading component (or skeleton)
    return <div>Loading...</div>;
  }

  return (
    <Page
      title={[name]}
      description={generateDescription({ name, stat, matches })}
    >
      <Header text={name} top />
      <p className="mb-4">{statPhrase(stat)}</p>
      <Fixtures matches={matches} />
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
