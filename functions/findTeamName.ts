import * as R from "remeda";
import { Match } from "types";
import { teamSlug } from "helpers";

export default function findTeamName(
  matches: Pick<Match, "teams">[],
  slug: string
): string {
  return R.pipe(
    matches,
    R.map((match) => match.teams),
    R.flatten(),
    R.find((team) => teamSlug(team) === slug),
    (team) => team?.name || ""
  );
}
