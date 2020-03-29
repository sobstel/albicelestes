import * as R from "remeda";

export default function collectTeamStat(
  matches: Pick<Match, "teams" | "score" | "result">[]
): TeamStat {
  const mp = matches.length;

  // FIXME: add countBy to utility
  const { W: mw, D: md, L: ml } = R.reduce(
    matches,
    (acc, match) => {
      acc[match.result] += 1;
      return acc;
    },
    { W: 0, D: 0, L: 0 }
  );

  const { gf, ga } = R.reduce(
    matches,
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
