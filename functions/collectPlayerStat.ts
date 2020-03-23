import * as R from "remeda";

export default function collectPlayerStat(
  matches: Match[],
  id: string
): PlayerStat {
  const mp = matches.length;

  const [si, so] = R.map(
    ["in", "out"],
    (type: "in" | "out") =>
      R.filter(
        matches,
        (match) =>
          !!R.find(
            R.flatten(match.lineups),
            (player) => player.id === id && !!player[type]
          )
      ).length
  );

  const g = R.reduce(
    matches,
    (count, match) => {
      return (
        count +
        R.filter(
          R.flatten(match.goals),
          (goal) => goal.id === id && goal.type !== "OG"
        ).length
      );
    },
    0
  );

  const [yc, rc] = R.map(
    ["Y", "R"],
    (type) =>
      R.filter(
        matches,
        (match) =>
          !!R.find(
            R.flatten(match.cards),
            (card) => card.id === id && card.type === type
          )
      ).length
  );

  return { mp, si, so, g, yc, rc };
}
