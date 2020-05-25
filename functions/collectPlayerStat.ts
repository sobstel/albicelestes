import * as R from "remeda";
import { Match, PlayerStat } from "types";
import { withoutSuspendedMatches } from "functions";
import { matchTeamIndex, playerSlug } from "helpers";

export default function collectPlayerStat(
  matches: Pick<Match, "teams" | "goals" | "cards" | "lineups" | "suspended">[],
  slug: string
): PlayerStat {
  const statableMatches = withoutSuspendedMatches(matches);

  const mp = R.filter(statableMatches, (match) =>
    match.lineups[matchTeamIndex(match)].some(
      (player) => playerSlug(player.name) === slug
    )
  ).length;

  statableMatches.length;

  const [si, so] = R.map(
    ["in", "out"],
    (type: "in" | "out") =>
      R.filter(statableMatches, (match) =>
        match.lineups[matchTeamIndex(match)].some(
          (player) => !!player[type] && playerSlug(player.name) === slug
        )
      ).length
  );

  const g = R.reduce(
    statableMatches,
    (count, match) => {
      return (
        count +
        R.filter(
          match.goals[matchTeamIndex(match)],
          (goal) => playerSlug(goal.name) === slug
        ).length
      );
    },
    0
  );

  const [yc, rc] = R.map(
    ["Y", "R"],
    (type) =>
      R.filter(statableMatches, (match) =>
        match.cards[matchTeamIndex(match)].some(
          (card) => card.type === type && playerSlug(card.name) === slug
        )
      ).length
  );

  return { mp, si, so, g, yc, rc };
}
