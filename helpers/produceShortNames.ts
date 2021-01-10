import * as R from "remeda";
import * as U from "utility";
import { fetchInflections } from "data";
import { getPlayerName } from "./getPlayerName";

function shortenName(name: string) {
  const inflections = fetchInflections();
  if (inflections[name]) {
    return inflections[name];
  }
  return getPlayerName(name).lastName;
}

export default function produceShortNames(
  names: string[]
): Record<string, string> {
  return R.pipe(
    names,
    R.map(shortenName),
    // convert duplicates to "F. Lastname"
    U.mapDuplicates((_, index) => {
      const nameObj = getPlayerName(names[index]);
      return `${nameObj.firstName.slice(0, 1)}. ${nameObj.lastName}`;
    }),
    // convert remaining duplicates to "Full Name"
    U.mapDuplicates((_, index) => names[index]),
    R.indexBy.indexed((_, index) => names[index])
  );
}
