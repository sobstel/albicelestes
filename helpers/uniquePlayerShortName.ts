import * as R from "remeda";
import immer from "immer";
import { fetchInflections } from "db";
import { playerName } from "helpers";

function shortenName(name: string) {
  const inflections = fetchInflections();
  if (inflections[name]) {
    return inflections[name];
  }
  return playerName(name).lastName;
}

function deduplicateWith(
  shortNames: string[],
  fullNames: string[],
  fn: (name: string) => string
): string[] {
  return R.pipe(
    shortNames,
    // creates [ name => [0, 1, ...] ]
    R.reduce.indexed(
      (acc, name, index) =>
        immer(acc, (draftAcc) => {
          (draftAcc[name] = draftAcc[name] || []).push(index);
        }),
      {} as Record<string, number[]>
    ),
    // converts obj to array
    (obj) => Object.values(obj),
    // gets indexes for duplicated names only
    R.filter((indexes) => indexes.length > 1),
    R.flatten(),
    R.map(parseInt),
    // call "fn" for each duplicated name
    R.reduce(
      (acc, index) =>
        immer(acc, (draftAcc) => {
          draftAcc[index] = fn(fullNames[index]);
        }),
      shortNames
    )
  );
}

const shortenNames = (fullNames: string[]): string[] => {
  return R.pipe(
    fullNames,
    R.map(shortenName),
    // convert duplicates to "F. Lastname"
    (shortNames) =>
      deduplicateWith(shortNames, fullNames, (fullName) => {
        const nameObj = playerName(fullName);
        return `${nameObj.firstName.slice(0, 1)}. ${nameObj.lastName}`;
      }),
    // convert remaining duplicates to "Full Name"
    (shortNames) =>
      deduplicateWith(shortNames, fullNames, (fullName) => fullName)
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
