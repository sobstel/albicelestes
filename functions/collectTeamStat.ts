import * as R from "remeda";
import immer from "immer";
import countBy from "lodash.countby";

export default function collectTeamStat(
  matches: Pick<Match, "teams" | "score" | "result">[]
): TeamStat {
  const mp = matches.length;

  const { W: mw, D: md, L: ml } = countBy(matches, "result");

  const { gf, ga } = R.reduce(
    matches,
    (acc, match) =>
      immer(acc, (draftAcc) => {
        const otherTeamIndex = match.teams.findIndex(
          (team) => team.slug !== "argentina"
        );

        draftAcc.gf += match.score[1 - otherTeamIndex];
        draftAcc.ga += match.score[otherTeamIndex];
      }),
    { gf: 0, ga: 0 }
  );

  return { mp, mw: mw || 0, md: md || 0, ml: ml || 0, gf, ga };
}
