import * as R from "remeda";

import { getMatchTeamIndex, getPlayerSlug } from "~/helpers";
import { Appearance, Goal, Match, PlayerItem } from "~/types";

type ReduceAcc = { [key: string]: PlayerItem };

function increment(
  acc: ReduceAcc,
  app: Appearance | Goal,
  key: "mp" | "si" | "so" | "g"
): void {
  const slug = getPlayerSlug(app.name);

  if (!acc[slug]) {
    acc[slug] = {
      name: app.name,
      mp: 0,
      si: 0,
      so: 0,
      g: 0,
    };
  }

  acc[slug][key] += 1;
}

export default function collectPlayers(
  matches: Pick<Match, "teams" | "lineups" | "goals">[]
): Array<PlayerItem> {
  return R.pipe(
    matches,
    R.reduce((acc, match) => {
      const myTeamIndex = getMatchTeamIndex(match);

      R.forEach(match.lineups[myTeamIndex], (app) => {
        increment(acc, app, "mp");
        if (app.in) increment(acc, app, "si");
        if (app.out) increment(acc, app, "so");
      });

      R.forEach(match.goals[myTeamIndex], (goal) => {
        if (goal.type === "OG") return;
        increment(acc, goal, "g");
      });

      return acc;
    }, {}),
    Object.values
  );
}
