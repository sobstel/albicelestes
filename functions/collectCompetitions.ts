import * as R from "remeda";
import { matchYear } from "helpers/match";

export default function collectCompetitions(
  matches: Pick<Match, "competition" | "date">[]
): string[] {
  return R.pipe(
    matches,
    R.reject(
      (match) =>
        !!R.find(
          ["Friendly", "World Cup Quals"],
          (namePart) => match.competition.indexOf(namePart) !== -1
        )
    ),
    R.map((match) => `${match.competition} ${matchYear(match)}`),
    R.uniq()
  );
}
