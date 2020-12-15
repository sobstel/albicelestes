import * as R from "remeda";
import got from "got";
import { fetchMatches } from "db";
import { spinner } from "utility/command";
import util from "util";

// import jsonStringify from "utility/jsonStringify";

const TEAM_URL = "https://golazon.com/api/teams/03l";
type TeamResponse = { recentFixtures: { match_id: string; date: string }[] };

const MATCH_URL = "https://golazon.com/api/matches/ID";

// TODO: move to hyena
type Person = { person_id: string; name: string };
type Appearance = Person & { in?: string; out?: string };
type Goal = Person & { code: string; score: [number, number]; min: string };
type Card = Person & { code: string; min: string };
type MatchResponse = {
  match_id: string;
  date: string;
  time: string;
  home_id: string;
  home_name: string;
  away_id: string;
  away_name: string;
  ended?: boolean;
  ft: [number, number];
  ht: [number, number];
  goals: Goal[];
  penalty_shootout: unknown;
  cards: Card[];
  home_players: Appearance[];
  home_coach: Person;
  away_players: Appearance[];
  away_coach: Person;
  competition_id: string;
  competition_name: string;
  area_name: string;
  round_name: string;
  teamtype: string | null;
};

export default async () => {
  spinner.next("Fetch recent matches from Golazon API");
  const response = await got(TEAM_URL);

  spinner.next("Parse fetched matches");
  const { recentFixtures } = JSON.parse(response.body) as TeamResponse;

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

  const apiResponses = await Promise.all(
    R.map(matchIds, (matchId) => got(MATCH_URL.replace("ID", matchId)))
  );

  apiResponses.forEach((response) => {
    const match = JSON.parse(response.body) as MatchResponse;
    /* eslint-disable @typescript-eslint/camelcase */
    console.log(
      util.inspect(
        {
          slug: "", // TODO: helper to generate slug
          match_id: match["match_id"],
          date: match.date,
          competition: match["competition_name"],
          // TODO: venue
          round: match["round_name"], // TODO: add to albicelestes types
          teams: [match["home_name"], match["away_name"]],
          score: match.ft,
          // TODO: pen
          // TODO: result (W/L/D)
          // TODO: goals: match.goals (partition and save only selected data)
          // TODO: cards: match.cards, (partition and ssave only selected data)
          coaches: [
            { name: match["home_coach"].name },
            { name: match["away_coach"].name },
          ],
          lineups: [match["home_players"], match["away_players"]].map((apps) =>
            apps.map((app) => ({
              name: app.name,
              ...(app.in && { in: app.in }),
              ...(app.out && { out: app.out }),
            }))
          ),
          // TODO: sources
          // TODO: suspended?
          // TODO: penaltyShootout
        },
        { depth: 4 }
      )
    );
    /* eslint-enable */

    // TODO: match popular names (if no other similar)
    // TODO: (?) have index of names by person_id
    // TODO: use inquirer
    // dbMatches = dbMatches.concat(newMatch);
    // TODO: save to db
    // dbMatches
    // jsonStringify();
  });

  spinner.done();
};
