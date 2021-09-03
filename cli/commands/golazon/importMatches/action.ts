import * as R from "remeda";
import got from "got";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { loadData, saveData, spinner } from "cli/utlity";
import { Match } from "types";
import * as Golazon from "./golazon";
import * as Conversion from "./conversion";

dayjs.extend(isBetween);

const MATCHES_URL =
  "https://75sgwy2tr3.execute-api.eu-west-2.amazonaws.com/prod/hyena?func=teams/03l/matches/YEAR";
const MATCH_URL = "https://golazon.com/api/matches/ID";

const isSameMatchDate = (date1: string, date2: string) =>
  dayjs(date1).isBetween(
    // due to timezone differences, dates might differ by one day
    dayjs(date2).subtract(1, "day"),
    dayjs(date2).add(1, "day"),
    null,
    "[]"
  );

const isMatchAlreadyVerified = (match: Match) =>
  Boolean(match?.sources?.length);

const fetchGolazonMatch = async (matchId: string) => {
  const response = await got(MATCH_URL.replace("ID", matchId));
  const golazonMatch: Golazon.Match = JSON.parse(response.body);
  return golazonMatch;
};

export default async (year: string): Promise<void> => {
  spinner.next(`Fetch matches from Golazon API (${year})`);
  const response = await got(MATCHES_URL.replace("YEAR", year));

  spinner.next("Parse fetched matches");
  const golazonFixtures: ReadonlyArray<Golazon.Match> = JSON.parse(
    response.body
  );

  spinner.next("Fetch matches from local DB");
  const matches = loadData("matches") as Array<Match>;
  spinner.done();

  const updatedMatches: Array<Match> = [];

  for (const match of matches) {
    const sameDateGolazonFixture = R.find(golazonFixtures, (golazonFixture) =>
      isSameMatchDate(golazonFixture["date"], match["date"])
    );
    if (sameDateGolazonFixture && !isMatchAlreadyVerified(match)) {
      spinner.next(
        `${sameDateGolazonFixture.date}: ${sameDateGolazonFixture.home_name} v ${sameDateGolazonFixture.away_name}`
      );
      const golazonMatch = await fetchGolazonMatch(
        sameDateGolazonFixture["match_id"]
      );
      const convertedMatch = await Conversion.toMatch(golazonMatch, matches);
      if (convertedMatch) {
        updatedMatches.push(convertedMatch);
        spinner.done();
        continue;
      }
      spinner.done();
    }

    const lastUpdatedMatch = R.last(updatedMatches);
    const inRangeGolazonFixtures = R.filter(
      golazonFixtures,
      (golazonFixture) =>
        (!lastUpdatedMatch ||
          !isSameMatchDate(golazonFixture["date"], lastUpdatedMatch["date"])) &&
        !isSameMatchDate(golazonFixture["date"], match["date"]) &&
        (!lastUpdatedMatch ||
          dayjs(golazonFixture["date"]).isAfter(lastUpdatedMatch["date"])) &&
        dayjs(golazonFixture["date"]).isBefore(match["date"])
    );
    for (const inRangeGolazonFixture of inRangeGolazonFixtures) {
      spinner.next(
        `${inRangeGolazonFixture.date}: ${inRangeGolazonFixture.home_name} v ${inRangeGolazonFixture.away_name}`
      );
      const golazonMatch = await fetchGolazonMatch(
        inRangeGolazonFixture["match_id"]
      );
      const convertedMatch = await Conversion.toMatch(golazonMatch, matches);
      if (convertedMatch) {
        updatedMatches.push(convertedMatch);
      }
      spinner.done();
    }

    updatedMatches.push(match);
  }

  spinner.next(`Save updated matches...`);
  saveData("matches", updatedMatches);
  spinner.done();
};
