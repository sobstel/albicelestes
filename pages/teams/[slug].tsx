import React from "react";
import * as R from "remeda";
import { fetchMatches } from "data";
import { findTeamName, collectTeams, collectTeamStat } from "helpers";
import { getMatchItem, getTeamSlug } from "helpers";
import Page, { Props } from "components/Page/Team";

export default function PageContainer(props: Props) {
  return <Page {...props} />;
}

type Context = { params: { slug: string } };

export async function getStaticProps(context: Context) {
  const { slug } = context.params;

  const matches = R.pipe(
    fetchMatches(),
    R.filter(
      (match) => !!R.find(match.teams, (team) => getTeamSlug(team) === slug)
    )
  );
  const name = findTeamName(matches, slug);
  const stat = collectTeamStat(matches);

  return {
    props: {
      slug,
      name,
      matches: matches.map(getMatchItem),
      stat,
    },
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
