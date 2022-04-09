import React from "react";
import { json, LoaderFunction, Outlet, useLoaderData } from "remix";

import YearHeader from "~/components/YearHeader";
import YearlyNav from "~/components/YearlyNav";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { year },
}: Parameters<LoaderFunction>[0]) {
  // TODO: de-duplicate
  if (!year || !/^\d{4}(\-\d{4})?$/.test(year)) {
    throw new Response("Not Found", { status: 404 });
  }

  return { year };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

export default function YearRootPage() {
  const { year } = useLoaderData<LoaderData>();

  return (
    <>
      <YearlyNav activeYear={year} />
      <YearHeader year={year} />
      <Outlet />
    </>
  );
}
