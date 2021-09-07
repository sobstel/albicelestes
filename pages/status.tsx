import * as R from "remeda";
import React from "react";
import { fetchMatches } from "data";
import { Match } from "types";
import { Page, Block, Header } from "components/layout";

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
    R.sortBy((stat) => -stat.total)
  );

  return (
    <Page title={["Status"]}>
      <Header top text="Data verification status" />
      <Block>
        <table>
          <tr key="all">
            <th className="text-left">TOTAL</th>
            <th className="text-right">{matchesTotal}</th>
            <th className="text-right">{matchesVerified}</th>
            <th className="text-right">{verifiedRatio}%</th>
          </tr>
          {R.map(competitionStats, (stat) => (
            <tr key={stat.name}>
              <td className="text-left">{stat.name}</td>
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
