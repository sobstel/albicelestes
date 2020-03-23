import * as R from "remeda";
import countBy from "lodash.countby";
import fromPairs from "lodash.frompairs";
import memoize from "lodash.memoize";
import pickBy from "lodash.pickby";
import zip from "lodash.zip";
import { inflect } from "db";
import { playerName, playerCatalog, playerSlug } from "helpers/player";
import Link from "components/Layout/Link";

function shortenName(name: string) {
  const inflectedName = inflect(name);
  if (inflectedName.inflected) return inflectedName.name;
  return playerName(name).lastName;
}

function deduplicateNames(indexedNames: Record<string, string>) {
  const indexedNamesUniq = indexedNames;

  let duplicateNames;
  let i = 0;

  do {
    i += 1;

    duplicateNames = Object.keys(
      pickBy(countBy(indexedNamesUniq), (count) => count > 1)
    );

    R.forEach(duplicateNames, (name) => {
      const duplicateIndexes = Object.keys(
        pickBy(indexedNamesUniq, (value: string) => value === name)
      );

      R.forEach(duplicateIndexes, (fullName: string) => {
        const firstNameLength = fullName.indexOf(" ");
        if (firstNameLength < i) return;

        const shortenedFirstName = fullName.slice(0, i);
        const lastName = shortenName(fullName);

        indexedNamesUniq[fullName] = `${shortenedFirstName}. ${lastName}`;
      });
    });
  } while (Object.keys(duplicateNames).length > 0 && i < 8);

  return indexedNamesUniq;
}

const shortenNames = memoize(function (names) {
  return R.pipe(
    names,
    (names) => fromPairs(zip(names, R.map(names, shortenName))),
    deduplicateNames
  );
});

export default function PlayerName({
  name,
  names,
  id = null,
}: {
  name: string;
  names: string[];
  id?: string | null;
}) {
  const shortNames = shortenNames(names);
  const shortName = shortNames[name] || name;

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
