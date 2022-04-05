import React from "react";
import { json, LoaderFunction, Outlet, useLoaderData } from "remix";

import PlayerCatalogNav from "~/components/PlayerCatalogNav";

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

export async function getLoaderData({
  params: { catalog },
}: Parameters<LoaderFunction>[0]) {
  return { catalog };
}

export const loader: LoaderFunction = async (args) => {
  return json<LoaderData>(await getLoaderData(args));
};

export default function PlayerCatalogPage() {
  const { catalog } = useLoaderData<LoaderData>();

  return (
    <>
      <PlayerCatalogNav catalog={catalog} />
      <Outlet />
    </>
  );
}
