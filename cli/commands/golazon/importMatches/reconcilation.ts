import * as R from "remeda";
import inquirer from "inquirer";
import {
  getMatchItem,
  getMatchTeamIndex,
  getPlayerSlug,
  getTeamSlug,
} from "helpers";
import { Match, MatchItem } from "types";
import { loadData, saveData } from "cli/utlity";
import * as Golazon from "./golazon";

const matches = loadData("matches") as Array<Match>;
const reversedMatches = R.reverse(matches);

const createSelectHavingTeamSlug = (teamSlug: string) => {
  return R.filter((match: Match) => {
    return Boolean(
      R.find(match.teams, (team) => getTeamSlug(team) === teamSlug)
    );
  });
};

function getCachedName(
  person: Golazon.Person,
  teamSlug: string
): string | undefined {
  const personId = person["person_id"];
  const teamCacheResource = `golazon/playerNames/${teamSlug}`;
  const playerNames = (loadData(teamCacheResource) || {}) as Record<
    string,
    string
  >;

  if (personId in playerNames) {
    return playerNames[personId];
  }
  return;
}

function setCachedName(person: Golazon.Person, teamSlug: string, name: string) {
  const personId = person["person_id"];
  const teamCacheResource = `golazon/playerNames/${teamSlug}`;
  const playerNames = (loadData(teamCacheResource) || {}) as Record<
    string,
    string
  >;

  playerNames[personId] = name;
  saveData(teamCacheResource, playerNames);
}

// Get name from the reconciler that cannot be commited into repository
async function getNameFromProprietaryReconciler(
  playerId: string | undefined
): Promise<string | void> {
  if (!playerId) {
    return;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const proprietaryReconciler = require("./proprietaryReconciler");
    return await proprietaryReconciler(playerId);
  } catch (e) {
    return;
  }
}

export async function reconcilePlayer(
  player: Golazon.Player,
  teamSlug: string
): Promise<string> {
  const slug = getPlayerSlug(player.name);
  const playerId = player["person_id"];

  const cachedName = getCachedName(player, teamSlug);
  if (cachedName) {
    return cachedName;
  }

  const suggestedPlayersObj = R.pipe(
    reversedMatches,
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

  const message = `Unrecognized player [${teamSlug} > ${playerId}: ${player.name}]`;

  if (suggestedPlayers.length > 0) {
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
      setCachedName(player, teamSlug, name);
      return name;
    }
  }

  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message,
      default:
        (await getNameFromProprietaryReconciler(playerId)) ?? player.name,
    },
  ]);

  setCachedName(player, teamSlug, name);
  return name;
}

export async function reconcileCoach(
  coach: Golazon.Coach,
  teamSlug: string
): Promise<string> {
  if (coach) {
    const coachSlug = getPlayerSlug(coach.name);

    const cachedName = getCachedName(coach, teamSlug);
    if (cachedName) {
      return cachedName;
    }

    const lastMatchName = R.pipe(
      reversedMatches,
      createSelectHavingTeamSlug(teamSlug),
      R.map(
        (match) => match.coaches?.[getMatchTeamIndex(match, teamSlug)]?.name
      ),
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
      default:
        (await getNameFromProprietaryReconciler(coach?.["person_id"])) ??
        coach?.name,
    },
  ]);

  if (coach) {
    setCachedName(coach, teamSlug, name);
  }

  return name;
}
