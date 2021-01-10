import * as R from "remeda";
import { Appearance, Match } from "types";
import { getMatchTeamIndex, getPlayerSlug } from "helpers";

export default function findNearestPlayerSlug(
  matches: Pick<Match, "teams" | "lineups">[],
  slug: string
): string | undefined {
  const players = R.pipe(
    matches,
    R.map((match) => match.lineups[getMatchTeamIndex(match)]),
    R.flatten()
  );

  const searchStrategies = [
    (player: Appearance) => getPlayerSlug(player.name) === slug,
    (player: Appearance) => {
      const slugParts = slug.split("-");
      return (
        getPlayerSlug(player.name) ===
        R.compact([slugParts.shift(), slugParts.pop()]).join("-")
      );
    },
    (player: Appearance) => {
      const slugParts = getPlayerSlug(player.name).split("-");
      return (
        R.compact([slugParts.shift()?.charAt(0), slugParts.pop()]).join("-") ===
        slug
      );
    },
  ];

  // it leverages remeda lazy evaluation
  const player = R.pipe(
    searchStrategies,
    R.map((fn) => R.find(players, fn)),
    R.find((player) => !!player)
  );

  if (!player) {
    return undefined;
  }

  return getPlayerSlug(player.name);
}
