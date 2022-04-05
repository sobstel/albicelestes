import React from "react";
import * as R from "remeda";
import { json, MetaFunction, useLoaderData } from "remix";

import { Header } from "~/components/layout";
import MatchList from "~/components/MatchList";
import YearNav from "~/components/YearNav";
import { fetchMatches } from "~/data";
import { getMatchItem } from "~/helpers";
import { seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

async function getLoaderData() {
  return R.pipe(
    fetchMatches(),
    R.reverse(),
    R.take(10),
    R.reverse(),
    R.map(getMatchItem)
  );
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
  const recentMatches = useLoaderData<LoaderData>();
  return (
    <>
      <YearNav />
      <Header top text="Recent matches" />
      <MatchList matches={recentMatches} />
    </>
  );
}
