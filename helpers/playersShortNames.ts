import * as R from "remeda";
import * as U from "utility";
import { fetchInflections } from "db";
import { playerName } from "helpers";

function shortenName(name: string) {
  const inflections = fetchInflections();
  if (inflections[name]) {
    return inflections[name];
  }
  return playerName(name).lastName;
}

export default function playersShortNames(
  names: string[]
): Record<string, string> {
  return R.pipe(
    names,
    R.map(shortenName),
    // convert duplicates to "F. Lastname"
    U.deduplicate((index) => {
      const nameObj = playerName(names[index]);
      return `${nameObj.firstName.slice(0, 1)}. ${nameObj.lastName}`;
    }),
    // convert remaining duplicates to "Full Name"
    U.deduplicate((index) => names[index]),
    R.indexBy.indexed((_, index) => names[index])
  );
}
