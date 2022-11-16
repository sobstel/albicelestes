import React from "react";
import * as R from "remeda";
import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";

import CoachesList from "~/components/CoachesList";
import { Header } from "~/components/layout";
import { fetchMatches } from "~/data";
import { collectCoaches } from "~/helpers";
import { seoTitle } from "~/utility";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData() {
  const coaches = R.pipe(
    fetchMatches(),
    R.filter((match) => match["date"] > "2008-10-30"),
    collectCoaches
  );
  return { coaches };
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>(await getLoaderData());
};

export const meta: MetaFunction = () => {
  return { title: seoTitle(["Coaches"]) };
};

export default function PlayerIndexPage() {
  const { coaches } = useLoaderData<LoaderData>();
  return (
    <>
      <Header text="Recent coaches" />
      <CoachesList coaches={coaches} />
    </>
  );
}
