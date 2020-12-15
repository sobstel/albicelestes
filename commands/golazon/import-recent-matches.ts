import * as R from "remeda";
import got from "got";
import { fetchMatches } from "db";
import { spinner } from "utility/command";
// import jsonStringify from "utility/jsonStringify";

const TEAM_URL = "https://golazon.com/api/teams/03l";
type TeamResponse = { recentFixtures: { match_id: string; date: string }[] };

const MATCH_URL = "https://golazon.com/api/matches/ID";
type MatchResponse = Record<string, unknown>;

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
    match;
    //   /* eslint-disable @typescript-eslint/camelcase */
    //   console.log({
    //     slug: "", // TODO: helper to generate slug
    //     match_id: match["match_id"],
    //     date: match["date"],
    //     // competition: match["competition"]?.name,
    //     teams: [match["home_name"], match["away_name"]],
    //   });
    //   /* eslint-enable */
    //   // TODO: match popular names (if no other similar)
    //   // TODO: (?) have index of names by person_id
    //   // TODO: use inquirer
    //   // dbMatches = dbMatches.concat(newMatch);
    //   // TODO: save to db
    //   // dbMatches
    //   // jsonStringify();
  });

  spinner.done();
};
