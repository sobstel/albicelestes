import React from "react";
import { playerCatalog, playerSlug } from "../helpers";
import Link from "./Layout/Link";

export default function PlayerName({
  name,
  displayName,
  id,
}: {
  name: string;
  displayName?: string;
  id?: string;
}) {
  if (!id) {
    return <span title={name}>{displayName || name}</span>;
  }

  const slug = playerSlug(name);
  const catalog = playerCatalog(name);

  return (
    <Link
      href="/players/[catalog]/[slug]/[id]"
      as={`/players/${catalog}/${slug}/${id}`}
      title={name}
    >
      {displayName || name}
    </Link>
  );
}
