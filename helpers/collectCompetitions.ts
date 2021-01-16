import * as R from "remeda";
import { getMatchYear } from "helpers";
import { Match } from "types";

export default function collectCompetitions(
  matches: Pick<Match, "competition" | "date">[]
): string[] {
  return R.pipe(
    matches,
    R.reject((match) =>
      Boolean(
        R.find(
          ["Friendly", "World Cup Quals", "Superclasico de las Americas"],
          (namePart) => match.competition.indexOf(namePart) !== -1
        )
      )
    ),
    R.map((match) => `${match.competition} ${getMatchYear(match)}`),
    R.uniq()
  );
}
