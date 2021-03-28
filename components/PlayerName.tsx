import React from "react";
import { getPlayerCatalog, getPlayerSlug } from "helpers";
import { LinkAnchor } from "./layout";

export default function PlayerName({
  name,
  displayName,
  linkify = false,
  teamSlug,
}: {
  name: string;
  displayName?: string;
  linkify?: boolean;
  teamSlug?: string;
}) {
  let normalizedDisplayName = displayName;
  if (teamSlug === "brazil") {
    normalizedDisplayName = name;
  }

  if (!linkify) {
    return <span title={name}>{normalizedDisplayName || name}</span>;
  }

  const slug = getPlayerSlug(name);
  const catalog = getPlayerCatalog(name);

  return (
    <LinkAnchor href={`/players/${catalog}/${slug}`} title={name}>
      {normalizedDisplayName || name}
    </LinkAnchor>
  );
}
