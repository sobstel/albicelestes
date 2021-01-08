import * as R from "remeda";
import got from "got";
import inquirer from "inquirer";
import { fetchMatches, fetchReversedMatches } from "db";
import { message, spinner } from "utility/command";
import util from "util";
import { Match, MatchItem, Result, Team } from "types";
import {
  matchItem,
  matchSlug,
  matchTeamIndex,
  matchYear,
  playerSlug,
  teamSlug,
} from "helpers";
// import jsonStringify from "utility/jsonStringify";

const TEAM_URL = "https://golazon.com/api/teams/03l";
const MATCH_URL = "https://golazon.com/api/matches/ID";

namespace Golazon {
  export type Person = { person_id: string; name: string };
  export type Player = Person & { in?: string; out?: string };
  export type Goal = Person & {
    code: "G" | "PG" | "OG";
    score: [number, number];
    min: string;
  };
  export type Card = Person & { code: "YC" | "RC" | "Y2C"; min: string };
  type Score = [number, number];

  export type Match = {
    match_id: string;
    date: string;
    time: string;
    home_id: string;
    home_name: string;
    away_id: string;
    away_name: string;
    ended?: boolean;
    suspended?: boolean;
    ft: Score;
    ht: Score;
    ps?: Score;
    goals: Goal[];
    cards: Card[];
    home_players: Player[];
    home_coach: Person;
    away_players: Player[];
    away_coach: Person;
    competition_id: string;
    competition_name: string;
    area_name: string;
    round_name: string;
    teamtype: string | null;
    venue: { name: string; city: string };
    penalty_shootout: (Person & { code: "G" | "M"; score: Score })[];
  };

  export type Team = { recentFixtures: { match_id: string; date: string }[] };
}

namespace Conversion {
  const toSlug = (match: Golazon.Match, dbMatches: Match[]) => {
    const slug = matchSlug({
      teams: [{ name: match.home_name }, { name: match.away_name }],
    });
    const year = matchYear({ date: match.date });

    const slugsCount =
      R.filter(
        dbMatches,
        (dbMatch) =>
          matchYear(dbMatch) === year && matchSlug(dbMatch).indexOf(slug) === 0
      ).length || 0;

    if (slugsCount > 0) {
      return `${slug}-${slugsCount + 1}`;
    }

    return false;
  };

  const toResult = (match: Golazon.Match) => {
    if (match.suspended) return Result.Suspended;

    const { ft, home_name: homeName } = match;
    const argFirst = homeName == "Argentina";

    if (ft[0] > ft[1]) return argFirst ? Result.Win : Result.Loss;
    if (ft[0] < ft[1]) return argFirst ? Result.Loss : Result.Win;
    return Result.Draw;
  };

  const toLineup = async (players: Golazon.Player[], teamSlug: string) => {
    const lineup = [];
    for (const player of players) {
      const name = await Reconciler.reconcilePlayer(player, teamSlug);
      lineup.push({
        name,
        ...(player.in && { in: player.in }),
        ...(player.out && { out: player.out }),
      });
    }
    return lineup;
  };

  const findTeamIndex = (
    match: Golazon.Match,
    playerable: { person_id: string }
  ) => {
    const isHome = R.find(
      match["home_players"],
      (player) => player["person_id"] === playerable["person_id"]
    );
    if (isHome) {
      return 0;
    }

    const isAway = R.find(
      match["away_players"],
      (player) => player["person_id"] === playerable["person_id"]
    );
    if (isAway) {
      return 1;
    }

    return false;
  };

  const toGoals = async (match: Golazon.Match) => {
    const toGoalType = (code: Golazon.Goal["code"]): "G" | "P" | "OG" => {
      if (code == "PG") return "P";
      return code;
    };

    const convertedGoals = [[], []] as Match["goals"];

    for (const goal of match.goals) {
      const index = findTeamIndex(match, goal);
      if (!index) continue;

      const name = await Reconciler.reconcilePlayer(
        goal,
        teamSlug(toTeams(match)[index])
      );
      const convertedGoal = {
        name,
        min: goal.min,
        type: toGoalType(goal.code),
      };
      convertedGoals[goal.code === "OG" ? Math.abs(index - 1) : index].push(
        convertedGoal
      );
    }

    return convertedGoals;
  };

  const toCards = async (match: Golazon.Match) => {
    const toCardType = (code: Golazon.Card["code"]): "Y" | "R" => {
      if (code == "YC") return "Y";
      if (code == "RC") return "R";
      if (code == "Y2C") return "Y";
      return "Y";
    };

    const convertedCards = [[], []] as Match["cards"];

    for (const card of match.cards) {
      const index = findTeamIndex(match, card);
      if (!index) continue;

      const name = await Reconciler.reconcilePlayer(
        card,
        teamSlug(toTeams(match)[index])
      );

      const convertedCard = {
        name,
        min: card.min,
        type: toCardType(card.code),
      };
      convertedCards[index].push(convertedCard);
      if (card.code === "Y2C") {
        // separate Y & R events for 2nd Y
        convertedCards[index].push({
          name,
          min: card.min,
          type: "R",
        });
      }
    }

    return convertedCards;
  };

  const toTeams = (match: Golazon.Match): [Team, Team] => {
    return [{ name: match["home_name"] }, { name: match["away_name"] }];
  };

  export const toMatch = async (
    match: Golazon.Match,
    dbMatches: Match[]
  ): Promise<Match> => {
    const slug = toSlug(match, dbMatches);

    const dbMatch: Match = {
      ...(slug && { slug }),
      date: match.date,
      competition: match["competition_name"],
      round: match["round_name"], // TODO: add to albicelestes types
      venue: { name: match.venue.name, city: match.venue.city },
      teams: toTeams(match),
      score: match.ft,
      ...(match.ps && { pen: match.ps }),
      result: toResult(match),
      goals: await toGoals(match),
      cards: await toCards(match),
      coaches: [
        { name: match["home_coach"].name },
        { name: match["away_coach"].name },
      ],
      lineups: [
        await toLineup(
          match["home_players"],
          teamSlug({ name: match["home_name"] })
        ),
        await toLineup(
          match["away_players"],
          teamSlug({ name: match["away_name"] })
        ),
      ],
      ...(match["penalty_shootout"] && {
        penaltyShootout: R.map(match["penalty_shootout"], (shot) => ({
          name: shot.name,
          score: shot.code === "M" ? "x" : shot.score,
        })),
      }),
      sources: ["Golazon"],
    };

    return dbMatch;
  };
}

namespace Reconciler {
  const scopeYear = new Date().getFullYear() - 25;

  const reversedRecentDbMatches = R.takeWhile(
    fetchReversedMatches(),
    (dbMatch) => Number(matchYear(dbMatch)) > scopeYear
  );

  export async function reconcilePlayer(
    person: Golazon.Person,
    personTeamSlug: string
  ): Promise<string> {
    const slug = playerSlug(person.name);

    // TODO: check golazon cache index

    const suggestedPlayersObj = R.pipe(
      reversedRecentDbMatches,
      R.filter((dbMatch) =>
        Boolean(
          R.find(dbMatch.teams, (team) => teamSlug(team) === personTeamSlug)
        )
      ),
      R.reduce((result, dbMatch) => {
        R.pipe(
          dbMatch.lineups[matchTeamIndex(dbMatch, personTeamSlug)],
          R.filter(
            (dbPlayer) => playerSlug(dbPlayer.name).indexOf(slug) !== -1
          ),
          R.forEach((dbPlayer) => {
            const { name } = dbPlayer;
            if (!result[name]) {
              result[name] = { mp: 0, lastMatch: matchItem(dbMatch) };
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
      // TODO: save choice in index (slug => person_id => name)
      return suggestedPlayers[0].name;
    }

    const message = `Unrecognized player [${personTeamSlug}, ${person.name}, ${person["person_id"]}]`;

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
        // TODO: save choice in index (slug => person_id => name)
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

    // TODO: save choice in index (slug => person_id => name)
    return name;
  }

  // function reconcileCoach(person: Golazon.Person) {}
}

export default async (): Promise<void> => {
  spinner.next("Fetch recent matches from Golazon API");
  const response = await got(TEAM_URL);

  spinner.next("Parse fetched matches");
  const { recentFixtures } = JSON.parse(response.body) as Golazon.Team;

  spinner.next("Fetch matches and last match from DB");
  const dbMatches = fetchMatches();
  const dbLastMatch = R.last(dbMatches);
  if (!dbLastMatch) {
    throw new Error("Db last match not found");
  }

  const matchIds = R.pipe(
    recentFixtures,
    R.filter((fixture) => fixture["date"] > dbLastMatch["date"]),
    R.map(R.prop("match_id"))
  );

  for (const matchId of matchIds) {
    spinner.next(`Fetch data from golazon (${matchId})`);
    const response = await got(MATCH_URL.replace("ID", matchId));
    spinner.done();

    const match = JSON.parse(response.body) as Golazon.Match;
    message.info(
      `${match.date}: ${match["home_name"]} v ${match["away_name"]} `
    );

    const dbMatch = await Conversion.toMatch(match, dbMatches);
    console.log(util.inspect(dbMatch, { depth: 4 }));

    // dbMatches = dbMatches.concat(newMatch);
    // TODO: save to db
    // jsonStringify();
  }
};
