import React from "react";
import { getPlayerCatalog, getPlayerSlug } from "~/helpers";
import { LinkAnchor } from "./layout";

export default function PlayerName({
  name,
  linkify = false,
}: {
  name: string;
  linkify?: boolean;
}) {
  if (!linkify) {
    return <>{name}</>;
  }

  const slug = getPlayerSlug(name);
  const catalog = getPlayerCatalog(name);

  return <LinkAnchor href={`/players/${catalog}/${slug}`}>{name}</LinkAnchor>;
}
