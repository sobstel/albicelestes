import * as R from "remeda";
import { Match, Result } from "types";

export default function rejectSuspendedMatches<T extends Pick<Match, "result">>(
  matches: T[]
): T[] {
  return R.filter(matches, (match) => match.result !== Result.Suspended);
}
