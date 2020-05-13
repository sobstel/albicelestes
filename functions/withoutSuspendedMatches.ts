import * as R from "remeda";
import { Match } from "types";

export default function withoutSuspendedMatches<
  T extends Pick<Match, "suspended">
>(matches: T[]): T[] {
  return R.filter(matches, (match) => !match?.suspended);
}
