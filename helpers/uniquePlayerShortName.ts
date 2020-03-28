import * as R from "remeda";
import { fetchInflections } from "db";
import { playerName } from "helpers";

function shortenName(name: string) {
  const inflections = fetchInflections();
  if (inflections[name]) {
    return inflections[name];
  }
  return playerName(name).lastName;
}

function _deduplicateWith(
  shortNames: string[],
  fullNames: string[],
  fn: (name: string) => string
): string[] {
  return R.map.indexed(shortNames, (name, index, array) => {
    if (R.filter(array, (_name) => _name === name).length > 1) {
      return fn(fullNames[index]);
    }
    return name;
  });
}

// data-first
function deduplicateWith(
  shortNames: string[],
  fullNames: string[],
  fn: (name: string) => string
): string[];
// data-last
function deduplicateWith<T>(
  fullNames: string[],
  fn: (name: string) => string
): (shortNames: string[]) => string[];

function deduplicateWith() {
  return R.purry(_deduplicateWith, arguments);
}

const shortenNames = (fullNames: string[]): string[] => {
  return R.pipe(
    fullNames,
    R.map(shortenName),
    // convert duplicates to "F. Lastname"
    deduplicateWith(fullNames, (fullName) => {
      const nameObj = playerName(fullName);
      return `${nameObj.firstName.slice(0, 1)}. ${nameObj.lastName}`;
    }),
    // convert remaining duplicates to "Full Name"
    deduplicateWith(fullNames, (fullName) => fullName)
  );
};

export default function uniquePlayerShortName(
  name: string,
  names: string[]
): string {
  const nameIndex = R.findIndex(names, (_name) => _name === name);
  if (nameIndex === -1) {
    return name;
  }

  return shortenNames(names)[nameIndex];
}
