import * as R from "remeda";
import got from "got";
import { fetchMatches } from "db";

const TEAM_URL = "https://golazon.com/api/teams/03l";
type TeamResponse = { recentFixtures: { match_id: string; date: string }[] };

const MATCH_URL = "https://golazon.com/api/matches/ID";
type MatchResponse = { match_id: string };

export default async () => {
  const response = await got(TEAM_URL);

  const { recentFixtures } = JSON.parse(response.body) as TeamResponse;
  const dbMatches = fetchMatches();
  const dbLastMatch = R.last(dbMatches);

  if (!dbLastMatch) {
    // TODO: error message
    return;
  }

  const matches = R.filter(
    recentFixtures,
    (fixture) => fixture["date"] > dbLastMatch["date"]
  );

  R.forEach(matches, async (fixture) => {
    const response = await got(MATCH_URL.replace("ID", fixture["match_id"]));
    const match = JSON.parse(response.body) as MatchResponse;

    console.log(match);

    // TODO: match popular names (if no other similar)
    // TODO: have index of names by person_id

    // TODO: save to db
    // dbMatches
  });
};
