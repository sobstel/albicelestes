import * as R from "remeda";
import Page, { Props } from "components/Page/Team";
import { fetchMatches } from "db";
import {
  collectCompetitions,
  collectTeamName,
  collectTeams,
  collectTeamStat,
} from "functions";
import { matchItem } from "helpers";

export default function PageContainer(props: Props) {
  return <Page {...props} />;
}

type Context = { params: { slug: string } };

export async function getStaticProps(context: Context) {
  const { slug } = context.params;

  const matches = R.pipe(
    fetchMatches(),
    R.filter((match) => !!R.find(match.teams, (team) => team.slug === slug))
  );
  const name = collectTeamName(matches, slug);
  const competitions = collectCompetitions(matches);
  const stat = collectTeamStat(matches);

  return {
    props: { name, competitions, matches: matches.map(matchItem), stat },
  };
}

export async function getStaticPaths() {
  const paths = R.pipe(
    fetchMatches(),
    collectTeams,
    R.map((team) => ({ params: { slug: team.slug } }))
  );

  return { paths, fallback: false };
}
