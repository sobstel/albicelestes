import Listr from "listr";
import * as R from "remeda";
import got from "got";
import { fetchMatches } from "db";
// import jsonStringify from "utility/jsonStringify";

const TEAM_URL = "https://golazon.com/api/teams/03l";
type TeamResponse = { recentFixtures: { match_id: string; date: string }[] };

// const MATCH_URL = "https://golazon.com/api/matches/ID";
// type MatchResponse = Record<string, unknown>;

export default () => {
  const tasks = new Listr([
    {
      title: "Fetch all recent team fixtures",
      task: (ctx) =>
        got(TEAM_URL).then((response) => {
          const { recentFixtures } = JSON.parse(response.body) as TeamResponse;
          ctx.apiRecentFixtures = recentFixtures;
        }),
    },
    {
      title: "Extract new matches ids",
      task: (ctx) => {
        const dbMatches = fetchMatches();
        const dbLastMatch = R.last(dbMatches);

        if (!dbLastMatch) {
          throw new Error("Db last match not found");
        }

        const newFixtureIds = R.pipe(
          ctx.apiRecentFixtures,
          // @ts-ignore
          R.filter((fixture) => fixture["date"] > dbLastMatch["date"]),
          // @ts-ignore
          R.map(R.prop("match_id"))
        );

        ctx.newFixtureIds = newFixtureIds;
      },
    },
  ]);

  tasks.run();
  // tasks.run.then(console.log);

  //

  // const { recentFixtures } = JSON.parse(response.body) as TeamResponse;

  // const apiResponses = await Promise.all(
  //   R.map(matches, (fixture) =>
  //     got(MATCH_URL.replace("ID", fixture["match_id"]))
  //   )
  // );

  // apiResponses.forEach((response) => {
  //   const match = JSON.parse(response.body) as MatchResponse;

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
  // });
};
