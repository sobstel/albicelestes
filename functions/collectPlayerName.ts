import * as R from "remeda";

export default function collectPlayerName(
  matches: Match[],
  id: string
): string {
  // FIXME: make it work for all matches, not just first, like collectTeamName
  const match = R.first(matches);
  if (!match) return "";

  return R.pipe(
    match,
    R.prop("lineups"),
    R.flatten(),
    R.find((player) => player.id === id),
    (player) => player?.name || ""
  );
}
