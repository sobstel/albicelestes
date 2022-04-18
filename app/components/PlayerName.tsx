import React from "react";

import { getPlayerInitial, getPlayerSlug } from "~/helpers";

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
  const initial = getPlayerInitial(name);

  return <LinkAnchor href={`/players/${initial}/${slug}`}>{name}</LinkAnchor>;
}
