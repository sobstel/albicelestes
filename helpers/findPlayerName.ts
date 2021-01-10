import * as R from "remeda";
import { Match } from "types";
import { getMatchTeamIndex, getPlayerSlug } from "helpers";

export default function findPlayerName(
  matches: Pick<Match, "teams" | "lineups">[],
  slug: string
): string {
  return R.pipe(
    matches,
    R.map((match) => match.lineups[getMatchTeamIndex(match)]),
    R.flatten(),
    R.find((player) => getPlayerSlug(player.name) === slug),
    (player) => player?.name || ""
  );
}
