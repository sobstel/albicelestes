import React from "react";
import * as R from "remeda";
import { json, useLoaderData } from "remix";

import { Header, Page } from "~/components/layout";
import MatchList from "~/components/MatchList";
import YearNav from "~/components/YearNav";
import { fetchMatches } from "~/data";
import { getMatchItem } from "~/helpers";

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

export default function IndexPage() {
  const recentMatches = useLoaderData<LoaderData>();
  return (
    <Page title={["Argentina National Team Archive"]}>
      <YearNav />
      <Header top text="Recent matches" />
      <MatchList matches={recentMatches} />
    </Page>
  );
}
