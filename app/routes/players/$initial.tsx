import React from "react";
import { json, LoaderFunction, Outlet, useLoaderData } from "remix";

import PlayerNav from "~/components/PlayerNav";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { initial },
}: Parameters<LoaderFunction>[0]) {
  return { initial };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

export default function PlayerInitialRootPage() {
  const { initial } = useLoaderData<LoaderData>();

  return (
    <>
      <PlayerNav initial={initial} />
      <Outlet />
    </>
  );
}
