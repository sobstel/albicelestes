import * as R from "remeda";
import { rejectSuspendedMatches } from "helpers";
import { getMatchTeamIndex } from "helpers";
import { Match, TeamStat } from "types";

export default function collectTeamStat(
  matches: Pick<Match, "teams" | "score" | "result">[]
): TeamStat {
  const statableMatches = rejectSuspendedMatches(matches);

  const mp = statableMatches.length;

  // countBy
  const {
    W: mw,
    D: md,
    L: ml,
  } = R.reduce(
    statableMatches,
    (acc, match) => {
      if (match.result !== "S") {
        acc[match.result] += 1;
      }
      return acc;
    },
    { W: 0, D: 0, L: 0 }
  );

  const { gf, ga } = R.reduce(
    statableMatches,
    (acc, match) => {
      const myTeamIndex = getMatchTeamIndex(match);
      acc.gf += match.score[myTeamIndex];
      acc.ga += match.score[1 - myTeamIndex];

      return acc;
    },
    { gf: 0, ga: 0 }
  );

  return { mp, mw, md, ml, gf, ga };
}
