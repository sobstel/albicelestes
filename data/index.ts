import * as R from "remeda";
import { getPlayerCatalog, getPlayerSlug } from "helpers";
import { Match, PlayerInfo, Bibliography } from "types";

// NOTE: "import" is not used to prevent tsc from checking files that are too big
export const fetchMatches = R.once((): Match[] => require("./matches.json"));

type Inflections = Record<string, string>

export const fetchCompetitionInflections = R.once(
  (): Inflections => require("./inflections/competitions.json")
);
export const fetchShortCompetitionInflections = R.once(
  (): Inflections => require("./inflections/short-competitions.json")
);
export const fetchPlayerInflections = R.once(
  (): Inflections => require("./inflections/players.json")
);
export const fetchTeamInflections = R.once(
  (): Inflections => require("./inflections/teams.json")
);


export function fetchPlayerInfo(name: string, id: string): PlayerInfo {
  try {
    return require(`data/players/${getPlayerCatalog(name)}/${getPlayerSlug(
      name
    )}-${id}.json`);
  } catch (e) {
    return {};
  }
}

export const fetchBibliography = R.once(
  (): Bibliography => require("./bibliography.json")
);
