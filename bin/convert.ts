import util from "util";
import fs from "fs";
import * as R from "remeda";
import { fetchMatches } from "db";
import { Appearance, Goal, Card, MatchTeam } from "types";
import { teamSlug } from "helpers";

const matches = fetchMatches();

const convertedMatches = matches.map((match) => {
  const convertedMatch = R.omit(match, ["id"]);

  convertedMatch.lineups = convertedMatch.lineups.map((lineup) =>
    R.uniqBy(
      lineup.map((app) => R.omit(app, ["id"])),
      (app) => app.name
    )
  ) as [Appearance[], Appearance[]];

  convertedMatch.goals = convertedMatch.goals.map((goals) =>
    goals.map((goal) => R.omit(goal, ["id"]))
  ) as [Goal[], Goal[]];

  convertedMatch.cards = convertedMatch.cards.map((cards) =>
    cards.map((card) => R.omit(card, ["id"]))
  ) as [Card[], Card[]];

  convertedMatch.teams = convertedMatch.teams.map((team) => {
    if (team.slug && teamSlug(team.name) === team.slug) {
      return R.omit(team, ["slug"]);
    }
    return team;
  }) as [MatchTeam, MatchTeam];

  return convertedMatch;
});

fs.writeFileSync(
  "db/matches.converted.json",
  JSON.stringify(convertedMatches, null, 2)
);

console.log(util.inspect(convertedMatches, { depth: null }));
