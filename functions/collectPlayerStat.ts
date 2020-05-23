import * as R from "remeda";
import { Match, PlayerStat } from "types";
import { withoutSuspendedMatches } from "functions";
import { playerSlug } from "helpers";

export default function collectPlayerStat(
  matches: Match[],
  slug: string
): PlayerStat {
  const statableMatches = withoutSuspendedMatches(matches);

  const mp = statableMatches.length;

  const [si, so] = R.map(
    ["in", "out"],
    (type: "in" | "out") =>
      R.filter(
        statableMatches,
        (match) =>
          !!R.find(
            R.flatten(match.lineups),
            (player) => playerSlug(player.name) === slug && !!player[type]
          )
      ).length
  );

  const g = R.reduce(
    statableMatches,
    (count, match) => {
      return (
        count +
        R.filter(
          R.flatten(match.goals),
          (goal) => playerSlug(goal.name) === slug && goal.type !== "OG"
        ).length
      );
    },
    0
  );

  const [yc, rc] = R.map(
    ["Y", "R"],
    (type) =>
      R.filter(
        statableMatches,
        (match) =>
          !!R.find(
            R.flatten(match.cards),
            (card) => playerSlug(card.name) === slug && card.type === type
          )
      ).length
  );

  return { mp, si, so, g, yc, rc };
}
