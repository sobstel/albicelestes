import * as R from "remeda";
import { Match, TeamStat } from "types";

export default function collectTeamStat(
  matches: Pick<Match, "teams" | "score" | "result" | "suspended">[]
): TeamStat {
  const statableMatches = R.filter(matches, (match) => !match?.suspended);

  const mp = statableMatches.length;

  // FIXME: add countBy to utility
  const { W: mw, D: md, L: ml } = R.reduce(
    statableMatches,
    (acc, match) => {
      acc[match.result] += 1;
      return acc;
    },
    { W: 0, D: 0, L: 0, S: 0 }
  );

  const { gf, ga } = R.reduce(
    statableMatches,
    (acc, match) => {
      const otherTeamIndex = match.teams.findIndex(
        (team) => team.slug !== "argentina"
      );

      acc.gf += match.score[1 - otherTeamIndex];
      acc.ga += match.score[otherTeamIndex];

      return acc;
    },
    { gf: 0, ga: 0 }
  );

  return { mp, mw, md, ml, gf, ga };
}
