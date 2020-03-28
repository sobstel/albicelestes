import { playerCatalog, playerSlug, uniquePlayerShortName } from "helpers";
import Link from "components/Layout/Link";

export default function PlayerName({
  name,
  names,
  id,
}: {
  name: string;
  names: string[];
  id?: string;
}) {
  const shortName = uniquePlayerShortName(name, names);

  if (id) {
    const slug = playerSlug(name);
    const catalog = playerCatalog(name);

    return (
      <Link
        href="/players/[catalog]/[slug]/[id]"
        as={`/players/${catalog}/${slug}/${id}`}
        title={name}
      >
        {shortName}
      </Link>
    );
  }

  return <span title={name}>{shortName}</span>;
}
