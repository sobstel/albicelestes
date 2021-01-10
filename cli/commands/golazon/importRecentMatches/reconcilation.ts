import * as R from "remeda";
import inquirer from "inquirer";
import {
  getMatchItem,
  getMatchTeamIndex,
  getMatchYear,
  getPlayerSlug,
  getTeamSlug,
} from "helpers";
import { Match, MatchItem } from "types";
import { loadData, saveData } from "cli/utlity";
import * as Golazon from "./golazon";

const scopeYear = new Date().getFullYear() - 25;
const matches = loadData("matches") as Match[];

const reversedRecentMatches = R.pipe(
  matches,
  R.reverse(),
  R.takeWhile((match) => Number(getMatchYear(match)) > scopeYear)
);

const filterMatchHavingTeamSlug = (slug: string) => {
  return R.filter((match: Match) => {
    return Boolean(R.find(match.teams, (team) => getTeamSlug(team) === slug));
  });
};

export async function reconcilePlayer(
  person: Golazon.Person,
  personTeamSlug: string
): Promise<string> {
  const slug = getPlayerSlug(person.name);
  const personId = person["person_id"];
  const teamCacheResource = `golazon/playerNames/${personTeamSlug}`;

  const playerNames = (loadData(teamCacheResource) || {}) as Record<
    string,
    string
  >;
  if (personId in playerNames) {
    return playerNames[personId];
  }

  const suggestedPlayersObj = R.pipe(
    reversedRecentMatches,
    filterMatchHavingTeamSlug(personTeamSlug),
    R.reduce((result, match) => {
      R.pipe(
        match.lineups[getMatchTeamIndex(match, personTeamSlug)],
        R.filter((player) => getPlayerSlug(player.name).indexOf(slug) !== -1),
        R.forEach((player) => {
          const { name } = player;
          if (!result[name]) {
            result[name] = { mp: 0, lastMatch: getMatchItem(match) };
          }
          result[name].mp += 1;
        })
      );
      return result;
    }, {} as Record<string, { mp: number; lastMatch: MatchItem }>)
  );

  const suggestedPlayers = R.pipe(
    Object.entries(suggestedPlayersObj),
    R.map(([key, value]) => ({ name: key, ...value })),
    R.sortBy((suggestedPlayer) => suggestedPlayer.lastMatch.date),
    R.reverse()
  );

  if (suggestedPlayers.length === 1) {
    playerNames[personId] = suggestedPlayers[0].name;
    saveData(teamCacheResource, playerNames);

    return suggestedPlayers[0].name;
  }

  const message = `Unrecognized player [${personTeamSlug} > ${personId}: ${person.name}]`;

  if (suggestedPlayers.length > 1) {
    const { name } = await inquirer.prompt([
      {
        type: "rawlist",
        name: "name",
        message,
        choices: R.concat(
          R.map(suggestedPlayers, (p) => ({
            value: p.name,
            name: `${p.name} (${p.mp}) last: ${p.lastMatch.date} ${p.lastMatch.teams[0].name} v ${p.lastMatch.teams[1].name}`,
          })),
          [new inquirer.Separator(), "other"]
        ),
      },
    ]);

    if (name !== "other") {
      playerNames[personId] = name;
      saveData(teamCacheResource, playerNames);

      return name;
    }
  }

  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message,
      default: person.name,
    },
  ]);

  playerNames[personId] = name;
  saveData(teamCacheResource, playerNames);

  return name;
}

export async function reconcileCoach(
  person: Golazon.Person,
  personTeamSlug: string
): Promise<string> {
  const slug = getPlayerSlug(person.name);

  const lastMatchName = R.pipe(
    matches,
    filterMatchHavingTeamSlug(personTeamSlug),
    R.map(
      (match) => match.coaches[getMatchTeamIndex(match, personTeamSlug)]?.name
    ),
    R.first()
  );

  if (lastMatchName && getPlayerSlug(lastMatchName).indexOf(slug) !== -1) {
    return lastMatchName;
  }

  // TODO: inquiry

  return "TODO";
}
