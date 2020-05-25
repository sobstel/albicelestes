import React from "react";
import * as R from "remeda";
import Page from "components/Page/Teams";
import { collectTeams, withoutSuspendedMatches } from "functions";
import { fetchMatches } from "db";

export default function PageContainer(props: Parameters<typeof Page>[0]) {
  return <Page {...props} />;
}

export async function getStaticProps() {
  const teams = R.pipe(
    fetchMatches(),
    withoutSuspendedMatches,
    collectTeams,
    R.sortBy((team) => team.name)
  );

  return { props: { teams } };
}
