import * as R from "remeda";
import dayjs from "dayjs";
import { getMatchSlug, getMatchYear, getTeamSlug } from "helpers";
import { Match, Result, Team } from "types";
import * as Golazon from "./golazon";
import { reconcilePlayer, reconcileCoach } from "./reconcilation";

const toDate = (match: Golazon.Match) => {
  // if time is early, then it most likely means that local date was a day before
  if (match.time < "09:00") {
    return dayjs(`${match.date} ${match.time}`)
      .subtract(1, "day")
      .format("YYYY-MM-DD");
  }
  return match.date;
};

const toSlug = (match: Golazon.Match, dbMatches: Array<Match>) => {
  const slug = getMatchSlug({
    teams: [{ name: match.home_name }, { name: match.away_name }],
  });
  const year = getMatchYear({ date: match.date });

  const prevSlugsCount = R.pipe(
    dbMatches,
    R.filter((dbMatch) => getMatchYear(dbMatch) === year),
    R.filter((dbMatch) => getMatchSlug(dbMatch).indexOf(slug) === 0),
    R.filter((dbMatch) =>
      // in case dates are slightly wrong, move date more behind
      dayjs(dbMatch.date).isBefore(dayjs(match.date).subtract(3, "day"))
    )
  )?.length;

  if (!prevSlugsCount) {
    return;
  }

  return `${slug}-${prevSlugsCount + 1}`;
};

const toCompetition = (match: Golazon.Match): string => {
  const name = match["competition_name"];
  if (name === "WC Qualification South America") {
    return "World Cup Quals";
  }
  if (name === "Copa America") {
    return "Copa América";
  }
  if (name === "Friendlies") {
    return "Friendly";
  }
  return name;
};

const toRound = (match: Golazon.Match): string | undefined => {
  if (match["competition_name"] === "Friendlies") {
    return;
  }
  if (match["competition_name"] === "Regular Season") {
    return;
  }
  return match["round_name"];
};

const toResult = (match: Golazon.Match): Result => {
  if (match.suspended) return Result.Suspended;

  const { ft, home_name: homeName } = match;
  const argFirst = homeName == "Argentina";

  if (ft[0] > ft[1]) return argFirst ? Result.Win : Result.Loss;
  if (ft[0] < ft[1]) return argFirst ? Result.Loss : Result.Win;
  return Result.Draw;
};

const toLineup = async (players: Array<Golazon.Player>, teamSlug: string) => {
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

  return;
};

const toGoals = async (match: Golazon.Match) => {
  const toGoalType = (code: Golazon.Goal["code"]): "G" | "P" | "OG" => {
    if (code == "PG") return "P";
    return code;
  };

  const convertedGoals: Match["goals"] = [[], []];

  for (const goal of match.goals) {
    const index = findTeamIndex(match, goal);
    if (index === undefined) continue;

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
    if (index === undefined) continue;

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
  dbMatches: Array<Match>
): Promise<Match | undefined> => {
  if (match.postponed) {
    return;
  }

  const slug = toSlug(match, dbMatches);
  const homeTeamSlug = getTeamSlug({ name: match["home_name"] });
  const awayTeamSlug = getTeamSlug({ name: match["away_name"] });
  const round = toRound(match);

  const existingDbMatch = R.find(
    dbMatches,
    (dbMatch) => dbMatch.date === match.date
  );

  const dbMatch: Match = {
    ...(slug && { slug }),
    date: toDate(match),
    competition: toCompetition(match),
    ...(round && { round }),
    venue: { name: match.venue.name, city: match.venue.city },
    teams: toTeams(match),
    score: match.ft,
    ...(match.ps && { pen: match.ps }),
    result: toResult(match),
    goals: await toGoals(match),
    cards: await toCards(match),
    coaches: [
      {
        name:
          existingDbMatch?.coaches?.[0]?.name ||
          (await reconcileCoach(match["home_coach"], homeTeamSlug)),
      },
      {
        name:
          existingDbMatch?.coaches?.[1]?.name ||
          (await reconcileCoach(match["away_coach"], awayTeamSlug)),
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
