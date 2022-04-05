import React from "react";
import * as R from "remeda";
import { json, MetaFunction, useLoaderData } from "remix";

import { Block, Header } from "~/components/layout";
import { fetchMatches } from "~/data";
import { seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

async function getLoaderData() {
  const matches = fetchMatches();
  const verifiedMatches = R.filter(matches, (match) =>
    Boolean(match.sources?.length)
  );
  const matchesVerified = verifiedMatches.length;
  const matchesTotal = matches.length;
  const verifiedRatio = Math.ceil((matchesVerified / matchesTotal) * 100);
  const competitionStats = R.pipe(
    matches,
    R.groupBy((match) => match.competition),
    R.mapValues((value, key) => {
      const total = value.length;
      const verified = R.filter(value, (source) =>
        Boolean(source?.sources?.length)
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

  return {
    matchesTotal,
    matchesVerified,
    verifiedRatio,
    competitionStats,
  };
}

export const loader = async () => {
  return json<LoaderData>(await getLoaderData());
};

export const meta: MetaFunction = () => {
  return {
    title: seoTitle(["Status"]),
  };
};

export default function StatusPage() {
  const { matchesTotal, matchesVerified, verifiedRatio, competitionStats } =
    useLoaderData<LoaderData>();

  return (
    <>
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
            <tr key={String(stat.name)}>
              <td className="text-left">{stat.name}</td>
              <td className="text-right">{stat.total}</td>
              <td className="text-right">{stat.verified}</td>
              <td className="text-right">{stat.ratio}%</td>
            </tr>
          ))}
        </table>
      </Block>
    </>
  );
}
