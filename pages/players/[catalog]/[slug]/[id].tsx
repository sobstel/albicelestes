import * as R from "remeda";
import { useRouter } from "next/router";
import Page, { Props } from "components/Page/Player";
import { fetchMatches, fetchPlayerInfo } from "db";
import { matchItem, playerCatalog, playerSlug } from "helpers";
import {
  collectCompetitions,
  collectPlayerName,
  collectPlayerStat,
  collectPlayers,
  mostMatchesPlayed,
} from "functions";

// FIXME: "Link", `<https://albicelestes.com/players/${catalog}/${slug}/${id}>; rel="canonical"`

export default function PageContainer(props: Props) {
  const router = useRouter();
  if (router.isFallback) {
    // FIXME: have some loading component
    return <div>Loading...</div>;
  }

  return <Page {...props} />;
}

type Context = { params: { id: string; catalog: string; slug: string } };

export async function getStaticProps(context: Context) {
  const { id, slug } = context.params;

  const matches = R.filter(
    fetchMatches(),
    (match) => !!R.find(R.flatten(match.lineups), (app) => app.id === id)
  );

  const name = collectPlayerName(matches, id);
  const competitions = collectCompetitions(matches);
  const stat = collectPlayerStat(matches, id);
  const info = fetchPlayerInfo(name, id);

  return {
    props: {
      id,
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
    mostMatchesPlayed,
    R.take(1000),
    R.map((player) => ({
      params: {
        catalog: playerCatalog(player.name),
        slug: playerSlug(player.name),
        id: player.id,
      },
    }))
  );

  return { paths, fallback: true };
}
