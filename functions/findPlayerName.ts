import * as R from "remeda";
import { Match } from "types";
import { playerSlug } from "helpers";

export default function findPlayerName(
  matches: Pick<Match, "lineups">[],
  slug: string
): string {
  return R.pipe(
    matches,
    R.map((match) => match.lineups),
    R.flattenDeep(),
    R.find((player) => playerSlug(player.name) === slug),
    (player) => player?.name || ""
  );
}
