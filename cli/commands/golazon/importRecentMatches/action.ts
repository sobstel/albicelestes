import * as R from "remeda";
import got from "got";
import { loadData, saveData, message, spinner } from "cli/utlity";
import { Match } from "types";
import * as Golazon from "./golazon";
import * as Conversion from "./conversion";

const TEAM_URL = "https://golazon.com/api/teams/03l";
const MATCH_URL = "https://golazon.com/api/matches/ID";

export default async (): Promise<void> => {
  spinner.next("Fetch recent matches from Golazon API");
  const response = await got(TEAM_URL);

  spinner.next("Parse fetched matches");
  const { recentFixtures: recentGolazonMatches } = JSON.parse(
    response.body
  ) as Golazon.Team;

  spinner.next("Fetch matches and last match from DB");
  const matches = loadData("matches") as Array<Match>;
  const lastMatch = R.last(matches);
  if (!lastMatch) {
    throw new Error("Last match not found");
  }

  const matchIds = R.pipe(
    recentGolazonMatches,
    R.filter((golazonMatch) => golazonMatch["date"] > lastMatch["date"]),
    R.map(R.prop("match_id"))
  );

  for (const matchId of matchIds) {
    spinner.next(`Fetch data from golazon (${matchId})`);
    const response = await got(MATCH_URL.replace("ID", matchId));
    spinner.done();

    const golazonMatch = JSON.parse(response.body) as Golazon.Match;
    message.info(
      `${golazonMatch.date}: ${golazonMatch["home_name"]} v ${golazonMatch["away_name"]} `
    );

    const match = await Conversion.toMatch(golazonMatch, matches);
    if (match) {
      matches.push(match);
    }
  }

  spinner.next(`Save matches...`);
  saveData("matches", matches);
  spinner.done();
};
