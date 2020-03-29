import * as R from "remeda";
import produce from "immer";
import countBy from "lodash.countby";

export default function collectTeamStat(
  matches: Pick<Match, "teams" | "score" | "result">[]
): TeamStat {
  const mp = matches.length;

  const { W: mw, D: md, L: ml } = countBy(matches, "result");

  const { gf, ga } = R.reduce(
    matches,
    produce((acc, match) => {
      const otherTeamIndex = match.teams.findIndex(
        (team: TeamItem) => team.slug !== "argentina"
      );

      acc.gf += match.score[1 - otherTeamIndex];
      acc.ga += match.score[otherTeamIndex];
    }),
    { gf: 0, ga: 0 }
  );

  return { mp, mw: mw || 0, md: md || 0, ml: ml || 0, gf, ga };
}
