import React from "react";
import * as R from "remeda";
import { json, MetaFunction, useLoaderData } from "remix";

import { Header } from "~/components/layout";
import MatchList from "~/components/MatchList";
import YearlyNav from "~/components/YearlyNav";
import { fetchMatches } from "~/data";
import { getMatchItem } from "~/helpers";
import { seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

const LAST_MATCHES_COUNT = 5;
const LAST_FINALS_COUNT = 5;

async function getLoaderData() {
  const recentMatches = R.pipe(
    fetchMatches(),
    R.reverse(),
    R.take(LAST_MATCHES_COUNT),
    R.map(getMatchItem)
  );

  const finalMatches = R.pipe(
    fetchMatches(),
    R.reverse(),
    R.filter((match) => match["round"] === "Final" && match["result"] === "W"),
    R.take(LAST_FINALS_COUNT),
    R.map(getMatchItem)
  );

  return { recentMatches, finalMatches };
}

export const loader = async () => {
  return json<LoaderData>(await getLoaderData());
};

export const meta: MetaFunction = () => {
  return {
    title: seoTitle(["Argentina National Team Archive"]),
  };
};

export default function IndexPage() {
  const { recentMatches, finalMatches } = useLoaderData<LoaderData>();
  return (
    <>
      <YearlyNav />
      <Header top text={`Recent matches`} />
      <MatchList matches={recentMatches} />
      <Header top text={`Recent finals won`} />
      <MatchList matches={finalMatches} />
    </>
  );
}
