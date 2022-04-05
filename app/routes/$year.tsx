import pluralize from "pluralize";
import React from "react";
import * as R from "remeda";
import type { LoaderFunction } from "remix";
import { json, Outlet, useLoaderData } from "remix";

import YearNav from "~/components/YearNav";
import { MAX_YEAR, MIN_YEAR } from "~/config";
import { fetchMatches } from "~/data";
import { collectTeamStat, getMatchItem, getMatchYear } from "~/helpers";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { year },
}: Parameters<LoaderFunction>[0]) {
  // TODO: validate year and show 404 on invalid

  const yearBase = parseInt(String(parseInt(String(year)) / 10), 10);
  const yearFrom = `${yearBase}0`;

  return {
    year: yearFrom,
  };
}

export const loader: LoaderFunction = async (args) => {
  const {
    params: { year },
  } = args;
  if (!year || year < "1900" || year > String(MAX_YEAR)) {
    // TODO
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json<LoaderData>(await getLoaderData(args));
};

export default function YearIndexPage() {
  const { year } = useLoaderData<LoaderData>();
  return (
    <>
      <YearNav activeYear={parseInt(year, 10)} />
      <Outlet />
    </>
  );
}
