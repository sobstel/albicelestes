import * as R from "remeda";
import { matchSlug, matchYear, playerCatalog, playerSlug } from '../helpers';
import { Match, MatchInfo, MatchItem, PlayerInfo } from "types";

// note: "import" is not used to prevent tsc from checking files that are too big
export const fetchMatches = R.once((): Match[] => (require('./matches.json')));
export const fetchInflections = R.once((): Record<string, string> => (require('./inflections.json')));

export function fetchMatchInfo(match: MatchItem): MatchInfo {
  try {
    return require(`db/matches/${matchYear(match)}/${match.date}-${matchSlug(match)}.json`);
  } catch (e) {
    return {};
  }
}

export function fetchPlayerInfo(name: string, id: string): PlayerInfo {
  try {
    return require(`db/players/${playerCatalog(name)}/${playerSlug(name)}-${id}.json`);
  } catch (e) {
    return {};
  }
}

type BibliographyItem = { name: string, url: string };
type Bibliography = Record<string, BibliographyItem>

export const fetchBibliography = R.once((): Bibliography  => (require('./bibliography.json')));
