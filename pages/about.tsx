import * as R from "remeda";
import React from "react";
import Page, { Props } from "components/Page/About";
import { fetchBibliography, fetchMatches } from "db";

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

  const props: Props = {
    stat: {
      matchesTotal: matches.length,
      matchesVerified: verifiedMatches.length,
    },
    bibliography,
  };

  return { props };
}
