import * as R from "remeda";
import { Match } from "types";
import { getTeamSlug } from "helpers";

export default function findTeamName(
  matches: Pick<Match, "teams">[],
  slug: string
): string {
  return R.pipe(
    matches,
    R.reverse(),
    R.map((match) => match.teams),
    R.flatten(),
    R.find((team) => getTeamSlug(team) === slug),
    (team) => team?.name || ""
  );
}
