import React from "react";
import type { LoaderFunction } from "remix";
import { json, Outlet, useLoaderData } from "remix";

import YearNav from "~/components/YearNav";
import { MAX_YEAR, MIN_YEAR } from "~/config";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { year },
}: Parameters<LoaderFunction>[0]) {
  if (!year || year < String(MIN_YEAR) || year > String(MAX_YEAR)) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { year };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

export default function YearIndexPage() {
  const { year } = useLoaderData<LoaderData>();
  return (
    <>
      <YearNav activeYear={year} />
      <Outlet />
    </>
  );
}
