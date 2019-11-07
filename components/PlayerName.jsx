import {
  filter,
  flatten,
  forEach,
  fromPairs,
  mapValues,
  memoize,
  pickBy,
  reduce,
  size,
  zip
} from "lodash";
import slugify from "slugify";
import Link from "next/link";

function skipFirstName(name) {
  return name
    .split(" ")
    .slice(1)
    .join(" ");
}

function deduplicateNames(shortNames) {
  const uniqueNames = shortNames;

  let duplicates;
  let i = 1;
  let duplicateFirstNameMaxLength;

  do {
    duplicates = pickBy(
      uniqueNames,
      value =>
        filter(uniqueNames, otherValue => value === otherValue).length > 1
    );
    forEach(duplicates, (shortName, fullName) => {
      uniqueNames[fullName] = `${fullName.slice(0, i)}. ${skipFirstName(
        fullName
      )}`;
    });
    i += 1;

    duplicateFirstNameMaxLength = reduce(
      duplicates,
      (length, _, fullName) => {
        return Math.max(skipFirstName(fullName).length, length);
      },
      0
    );
  } while (size(duplicates) > 0 || i < duplicateFirstNameMaxLength - 1);

  return uniqueNames;
}

const shortenFirstNames = memoize(function(match) {
  const names = flatten(match.lineups).map(appearance => appearance.name);
  const indexedNames = fromPairs(zip(names, names));
  const shortNames = mapValues(indexedNames, skipFirstName);
  return deduplicateNames(shortNames);
});

function PlayerName({ name, match, id = null }) {
  const shortNames = shortenFirstNames(match);
  const shortName = shortNames[name] || id || "unknown";

  if (id) {
    const slug = slugify(name, { lower: true });
    return (
      <Link href={`/players/${slug}/${id}`} prefetch={false}>
        <a className="text-blue-600 hover:text-blue-400" title={name}>
          {shortName}
        </a>
      </Link>
    );
  }

  return <span title={name}>{shortName}</span>;
}

export default PlayerName;
