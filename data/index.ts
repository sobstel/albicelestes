import * as R from "remeda";
import { playerCatalog, playerSlug } from "helpers";
import { Match, PlayerInfo, Bibliography } from "types";

// note: "import" is not used to prevent tsc from checking files that are too big
export const fetchInflections = R.once(
  (): Record<string, string> => require("./inflections.json")
);
export const fetchMatches = R.once((): Match[] => require("./matches.json"));
export const fetchReversedMatches = R.once(() => R.reverse(fetchMatches()));

export function fetchPlayerInfo(name: string, id: string): PlayerInfo {
  try {
    return require(`db/players/${playerCatalog(name)}/${playerSlug(
      name
    )}-${id}.json`);
  } catch (e) {
    return {};
  }
}

export const fetchBibliography = R.once(
  (): Bibliography => require("./bibliography.json")
);
