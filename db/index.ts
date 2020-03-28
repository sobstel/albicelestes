import { matchSlug, matchYear, playerCatalog, playerSlug } from 'helpers';

// import is not used so it's not checked by typescript (file is too big)
const matches = require('db/matches.json');
const inflections = require('db/inflections.json');

export function fetchMatches(): Match[] {
  return matches;
}

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

type InflectedName = { name: string; inflected: boolean };

export function inflect(name: string): InflectedName {
  if (inflections[name]) {
    return { name: inflections[name], inflected: true };
  }
  return { name, inflected: false };
}
