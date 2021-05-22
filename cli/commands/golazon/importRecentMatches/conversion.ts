import * as R from "remeda";
import { getMatchSlug, getMatchYear, getTeamSlug } from "helpers";
import { Match, Result, Team } from "types";
import * as Golazon from "./golazon";
import { reconcilePlayer, reconcileCoach } from "./reconcilation";

const toSlug = (match: Golazon.Match, dbMatches: Match[]) => {
  const slug = getMatchSlug({
    teams: [{ name: match.home_name }, { name: match.away_name }],
  });
  const year = getMatchYear({ date: match.date });

  const slugsCount =
    R.filter(
      dbMatches,
      (dbMatch) =>
        getMatchYear(dbMatch) === year &&
        getMatchSlug(dbMatch).indexOf(slug) === 0
    ).length || 0;

  if (slugsCount > 0) {
    return `${slug}-${slugsCount + 1}`;
  }

  return false;
};

const toResult = (match: Golazon.Match): Result => {
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
    const name = await reconcilePlayer(player, teamSlug);
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

  const convertedGoals: Match["goals"] = [[], []];

  for (const goal of match.goals) {
    const index = findTeamIndex(match, goal);
    if (index === false) continue;

    const name = await reconcilePlayer(
      goal,
      getTeamSlug(toTeams(match)[index])
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

  const convertedCards: Required<Match["cards"]> = [[], []];

  for (const card of match.cards) {
    const index = findTeamIndex(match, card);
    if (index === false) continue;

    const name = await reconcilePlayer(
      card,
      getTeamSlug(toTeams(match)[index])
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
  const homeTeamSlug = getTeamSlug({ name: match["home_name"] });
  const awayTeamSlug = getTeamSlug({ name: match["away_name"] });

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
      {
        name: await reconcileCoach(match["home_coach"], homeTeamSlug),
      },
      {
        name: await reconcileCoach(match["away_coach"], awayTeamSlug),
      },
    ],
    lineups: [
      await toLineup(match["home_players"], homeTeamSlug),
      await toLineup(match["away_players"], awayTeamSlug),
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
