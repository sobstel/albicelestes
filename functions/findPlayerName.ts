import * as R from "remeda";

export default function findPlayerName(
  matches: Pick<Match, "lineups">[],
  id: string
): string {
  return R.pipe(
    matches,
    R.map((match) => match.lineups),
    R.flattenDeep(),
    R.find((player) => player.id === id),
    (player) => player?.name || ""
  );
}
