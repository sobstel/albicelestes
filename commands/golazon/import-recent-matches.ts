import * as R from "remeda";
import got from "got";
import { fetchMatches } from "db";

const TEAM_URL = "https://golazon.com/api/teams/03l";
type TeamResponse = { recentFixtures: { date: string }[] };

// TODO: const MATCH_URL
// TODO: type MatchResponse

export default async () => {
  const response = await got(TEAM_URL);

  const { recentFixtures } = JSON.parse(response.body) as TeamResponse;
  const lastMatch = R.last(fetchMatches());

  if (!lastMatch) {
    // TODO: error message
    return;
  }

  const matchesToImport = R.filter(
    recentFixtures,
    (fixture) => fixture["date"] > lastMatch["date"]
  );

  console.log(matchesToImport);
  console.log(matchesToImport.length);

  // TODO: call details for each match and save
};
