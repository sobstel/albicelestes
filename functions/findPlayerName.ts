import * as R from "remeda";
import { Match } from "types";

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
