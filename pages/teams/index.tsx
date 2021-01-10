import React from "react";
import * as R from "remeda";
import Page from "components/Page/Teams";
import { collectTeams, rejectSuspendedMatches } from "helpers";
import { fetchMatches } from "data";

export default function PageContainer(props: Parameters<typeof Page>[0]) {
  return <Page {...props} />;
}

export async function getStaticProps() {
  const teams = R.pipe(
    fetchMatches(),
    rejectSuspendedMatches,
    collectTeams,
    R.sortBy((team) => team.name)
  );

  return { props: { teams } };
}
