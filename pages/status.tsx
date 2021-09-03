import * as R from "remeda";
import React from "react";
import { fetchBibliography, fetchMatches } from "data";
import { collectPlayers, collectTeams } from "helpers";
import { Bibliography, Match } from "types";
import { Page, Block, Header, LinkAnchor } from "components/layout";

export async function getStaticProps() {
  const matches = fetchMatches();
  const verifiedMatches = R.filter(matches, (match) =>
    Boolean(match.sources?.length)
  );
  const props: Props = {
    matchesTotal: matches.length,
    matchesVerified: verifiedMatches.length,
    matchesByCompetition: R.groupBy(matches, (match) => match.competition),
  };

  return { props };
}

type Props = {
  matchesTotal: number;
  matchesVerified: number;
  matchesByCompetition: Record<string, Array<Match>>;
};

export default function StatusPage(props: Props) {
  const { matchesTotal, matchesVerified, matchesByCompetition } = props;
  const verifiedRatio = Math.ceil((matchesVerified / matchesTotal) * 100);

  const competitionStats = R.pipe(
    matchesByCompetition,
    R.mapValues((value, key) => {
      const total = value.length;
      const verified = R.filter(value, (x) =>
        Boolean(x?.sources?.length)
      ).length;

      return {
        name: key,
        total,
        verified,
        ratio: Math.ceil((verified / total) * 100),
      };
    }),
    R.values,
    R.sortBy((stat) => stat.name)
  );

  return (
    <Page title={["Status"]}>
      <Header top text="Status" />
      <p>
        Matches: {matchesTotal} (verified: {matchesVerified}, ~{verifiedRatio}%)
      </p>

      <Block>
        <Header text="By competition" />
        <table>
          {R.map(competitionStats, (stat) => (
            <tr key={stat.name}>
              <td>{stat.name}</td>
              <td className="text-right">{stat.total}</td>
              <td className="text-right">{stat.verified}</td>
              <td className="text-right">{stat.ratio}%</td>
            </tr>
          ))}
        </table>
      </Block>
    </Page>
  );
}
