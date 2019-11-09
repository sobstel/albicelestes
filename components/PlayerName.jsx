import {
  countBy,
  filter,
  flatten,
  forEach,
  fromPairs,
  keys,
  map,
  memoize,
  pickBy,
  reduce,
  size,
  zip
} from "lodash";
import slugify from "slugify";
import Link from "next/link";

function cutFirstName(name) {
  return name
    .split(" ")
    .slice(1)
    .join(" ");
}

function deduplicateNames(indexedNames) {
  const indexedNamesUniq = indexedNames;

  let duplicateNames;
  let i = 0;

  do {
    i += 1;

    duplicateNames = keys(
      pickBy(countBy(indexedNamesUniq), count => count > 1)
    );

    forEach(duplicateNames, name => {
      const duplicateIndexes = keys(
        pickBy(indexedNamesUniq, value => value === name)
      );

      forEach(duplicateIndexes, fullName => {
        const firstNameLength = fullName.indexOf(" ");
        if (firstNameLength < i) return;

        const shortenedFirstName = fullName.slice(0, i);
        const lastName = cutFirstName(fullName);

        indexedNamesUniq[fullName] = `${shortenedFirstName}. ${lastName}`;
      });
    });
  } while (size(duplicateNames) > 0 && i < 8);

  return indexedNamesUniq;
}

const shortenFirstNames = memoize(function(match) {
  const names = flatten(match.lineups).map(appearance => appearance.name);
  const indexedNames = fromPairs(zip(names, map(names, cutFirstName)));
  return deduplicateNames(indexedNames);
});

function PlayerName({ name, match, id = null }) {
  const shortNames = shortenFirstNames(match);
  const shortName = shortNames[name] || id || "unknown";

  if (id) {
    const slug = slugify(name, { lower: true });
    return (
      <Link href="/players/[slug]/[id]" as={`/players/${slug}/${id}`}>
        <a className="text-blue-600 hover:text-blue-400" title={name}>
          {shortName}
        </a>
      </Link>
    );
  }

  return <span title={name}>{shortName}</span>;
}

export default PlayerName;
