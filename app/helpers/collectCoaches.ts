import * as R from "remeda";

import { getMatchTeamIndex, getMatchYear } from "~/helpers";
import { CoachItem, Match } from "~/types";

export default function collectCoaches(
  matches: Pick<Match, "date" | "teams" | "coaches">[]
): Array<CoachItem> {
  return R.pipe(
    matches,
    R.filter((match) => getMatchYear(match) >= "1974"),
    R.reduce((coaches, match) => {
      const coachName = match?.coaches?.[getMatchTeamIndex(match)]?.name;
      if (!coachName) {
        return coaches;
      }

      if (R.last(coaches)?.name !== coachName) {
        coaches.push({
          name: coachName,
          yearFrom: getMatchYear(match),
          yearTo: getMatchYear(match),
          mp: 1,
        });
        return coaches;
      }

      const idx = coaches.length - 1;
      coaches[idx].mp += 1;
      coaches[idx].yearTo = getMatchYear(match);

      return coaches;
    }, [] as Array<CoachItem>),
    R.reverse()
  );
}
