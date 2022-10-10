import * as R from "remeda";

import { getMatchTeamIndex } from "~/helpers";
import { CoachItem, Match } from "~/types";

export default function collectCoaches(
  matches: Pick<Match, "teams" | "coaches">[]
): Array<CoachItem> {
  return R.pipe(
    matches,
    R.map((match) => ({
      name: match?.coaches?.[getMatchTeamIndex(match)]?.name || "",
    })),
    R.uniqBy((coach) => coach.name)
  );
}
