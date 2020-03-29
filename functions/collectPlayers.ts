import * as R from "remeda";
import produce from "immer";

type ReduceAcc = { [key: string]: PlayerItem };

function increment(
  acc: ReduceAcc,
  app: Appearance | Goal,
  key: "mp" | "si" | "so" | "g"
): void {
  if (!app.id) return;

  if (!acc[app.id]) {
    acc[app.id] = {
      id: app.id,
      name: app.name,
      mp: 0,
      si: 0,
      so: 0,
      g: 0,
    };
  }

  acc[app.id][key] += 1;
}

export default function collectPlayers(
  matches: { lineups: [Appearance[], Appearance[]]; goals: [Goal[], Goal[]] }[]
): PlayerItem[] {
  return R.pipe(
    matches,
    R.reduce(
      produce((acc, match) => {
        R.forEach(R.flatten(match.lineups), (app: Appearance) => {
          increment(acc, app, "mp");
          if (app.in) increment(acc, app, "si");
          if (app.out) increment(acc, app, "so");
        });

        R.forEach(R.flatten(match.goals), (goal: Goal) => {
          if (goal.type === "OG") return;
          increment(acc, goal, "g");
        });
      }),
      {}
    ),
    Object.values
  );
}
