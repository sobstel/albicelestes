import * as R from "remeda";
import { Match } from "types";
import { matchTeamIndex, playerSlug } from "helpers";

export default function findNearestPlayerSlug(
  matches: Pick<Match, "teams" | "lineups">[],
  slug: string
): string | null {
  const players = R.pipe(
    matches,
    R.map((match) => match.lineups[matchTeamIndex(match)]),
    R.flatten()
  );

  let player;

  // TODO: refactor to strategy fn
  // strategy: exact match
  player = R.find(players, (player) => playerSlug(player.name) === slug);
  if (player) return playerSlug(player.name);

  // TODO: refactor to strategy fn
  // strategy: first and last part of slug
  const slugParts = slug.split("-");
  const shortSlug = [slugParts[0], slugParts[slugParts.length - 1]].join("-");
  // TODO: use first/last name for playerSlug(player.name) too
  player = R.find(players, (player) => playerSlug(player.name) === shortSlug);
  if (player) return playerSlug(player.name);

  // strategy: levensthein
  // TODO:

  return null;
}
