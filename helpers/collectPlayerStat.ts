import * as R from "remeda";
import { Match, PlayerStat } from "types";
import { rejectSuspendedMatches } from "helpers";
import { getMatchTeamIndex, getPlayerSlug } from "helpers";

export default function collectPlayerStat(
  matches: Pick<Match, "teams" | "goals" | "cards" | "lineups" | "result">[],
  slug: string
): PlayerStat {
  const statableMatches = rejectSuspendedMatches(matches);

  const mp = R.filter(statableMatches, (match) =>
    match.lineups[getMatchTeamIndex(match)].some(
      (player) => getPlayerSlug(player.name) === slug
    )
  ).length;

  const [si, so] = R.map(
    ["in", "out"],
    (type: "in" | "out") =>
      R.filter(statableMatches, (match) =>
        match.lineups[getMatchTeamIndex(match)].some(
          (player) => !!player[type] && getPlayerSlug(player.name) === slug
        )
      ).length
  );

  const g = R.reduce(
    statableMatches,
    (count, match) => {
      return (
        count +
        R.filter(
          match.goals[getMatchTeamIndex(match)],
          (goal) => getPlayerSlug(goal.name) === slug
        ).length
      );
    },
    0
  );

  const [yc, rc] = R.map(
    ["Y", "R"],
    (type) =>
      R.filter(statableMatches, (match) =>
        Boolean(
          match.cards?.[getMatchTeamIndex(match)]?.some(
            (card) => card.type === type && getPlayerSlug(card.name) === slug
          )
        )
      ).length
  );

  return { mp, si, so, g, yc, rc };
}
