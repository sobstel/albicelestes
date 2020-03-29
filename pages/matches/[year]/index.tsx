import * as R from "remeda";
import { MIN_YEAR, MAX_YEAR } from "config";
import Page, { Props } from "components/Page/Matches";
import { fetchMatches } from "db";
import { collectPlayers } from "functions";
import { matchItem, matchYear } from "helpers";

export default function PageContainer(props: Props) {
  return <Page {...props} />;
}

type Context = { params: { year: string } };

export async function getStaticProps(context: Context) {
  const { year } = context.params;

  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => matchYear(match) === year)
  );

  if (!matches) {
    return {
      props: { year, matches: [], players: [] },
    };
  }

  const players = R.pipe(
    matches,
    collectPlayers,
    R.sortBy((player) => -player.mp)
  );

  return {
    props: {
      year,
      matches: R.map(matches, matchItem),
      players,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: R.pipe(
      R.range(MIN_YEAR, MAX_YEAR + 1),
      R.map((year) => ({ params: { year: year.toString() } }))
    ),
    fallback: false,
  };
}
