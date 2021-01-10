import * as R from "remeda";
import React from "react";
import Page from "components/Page/About";
import { fetchBibliography, fetchMatches } from "data";
import { collectPlayers, collectTeams } from "helpers";

type Props = Parameters<typeof Page>[0];

export default function PageContainer(props: Props) {
  return <Page {...props} />;
}

export async function getStaticProps() {
  const matches = fetchMatches();
  const verifiedMatches = R.filter(
    matches,
    (match) => !!match.sources && match.sources.length > 0
  );
  const bibliography = fetchBibliography();

  const playersTotal = collectPlayers(matches).length;
  const teamsTotal = collectTeams(matches).length;

  const props: Props = {
    stat: {
      matchesTotal: matches.length,
      matchesVerified: verifiedMatches.length,
      playersTotal,
      teamsTotal,
    },
    bibliography,
  };

  return { props };
}
