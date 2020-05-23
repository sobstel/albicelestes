import * as R from "remeda";
import { Match } from "types";
import { matchTeamIndex, playerSlug } from "helpers";

export default function findPlayerName(
  matches: Pick<Match, "teams" | "lineups">[],
  slug: string
): string {
  return R.pipe(
    matches,
    R.map((match) => match.lineups[matchTeamIndex(match)]),
    R.flatten(),
    R.find((player) => playerSlug(player.name) === slug),
    (player) => player?.name || ""
  );
}
