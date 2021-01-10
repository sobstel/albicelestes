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

const scopeYear = new Date().getFullYear() - 10;
const matches = loadData("matches") as Match[];

const reversedRecentMatches = R.pipe(
  matches,
  R.reverse(),
  R.takeWhile((match) => Number(getMatchYear(match)) > scopeYear)
);

const createSelectHavingTeamSlug = (teamSlug: string) => {
  return R.filter((match: Match) => {
    return Boolean(
      R.find(match.teams, (team) => getTeamSlug(team) === teamSlug)
    );
  });
};

export async function reconcilePlayer(
  player: Golazon.Player,
  teamSlug: string
): Promise<string> {
  const slug = getPlayerSlug(player.name);
  const playerId = player["person_id"];
  const teamCacheResource = `golazon/playerNames/${teamSlug}`;

  const playerNames = (loadData(teamCacheResource) || {}) as Record<
    string,
    string
  >;
  if (playerId in playerNames) {
    return playerNames[playerId];
  }

  const suggestedPlayersObj = R.pipe(
    reversedRecentMatches,
    createSelectHavingTeamSlug(teamSlug),
    R.reduce((result, match) => {
      R.pipe(
        match.lineups[getMatchTeamIndex(match, teamSlug)],
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
    playerNames[playerId] = suggestedPlayers[0].name;
    saveData(teamCacheResource, playerNames);

    return suggestedPlayers[0].name;
  }

  const message = `Unrecognized player [${teamSlug} > ${playerId}: ${player.name}]`;

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
      playerNames[playerId] = name;
      saveData(teamCacheResource, playerNames);

      return name;
    }
  }

  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message,
      default: player.name,
    },
  ]);

  playerNames[playerId] = name;
  saveData(teamCacheResource, playerNames);

  return name;
}

export async function reconcileCoach(
  coach: Golazon.Coach,
  teamSlug: string
): Promise<string> {
  if (coach) {
    const coachSlug = getPlayerSlug(coach.name);

    const lastMatchName = R.pipe(
      reversedRecentMatches,
      createSelectHavingTeamSlug(teamSlug),
      R.map((match) => match.coaches[getMatchTeamIndex(match, teamSlug)]?.name),
      R.first()
    );

    if (
      lastMatchName &&
      getPlayerSlug(lastMatchName).indexOf(coachSlug) !== -1
    ) {
      return lastMatchName;
    }
  }

  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: `Unrecognized coach [${teamSlug} > ${coach?.["person_id"]}: ${coach?.name}]`,
      default: coach?.name,
    },
  ]);

  return name;
}
