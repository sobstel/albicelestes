import * as R from "remeda";

import { Match, Result } from "~/types";

export default function getMatchScore(
  match: Pick<Match, "score" | "pen" | "result">
): string {
  let score = match.score.join(":");

  if (match.result === Result.Suspended) {
    score = "*";
  }

  const penPrefix = match.pen && `(${match.pen[0]})`;
  const penSuffix = match.pen && `(${match.pen[1]})`;

  return R.compact([penPrefix, score, penSuffix]).join("");
}
