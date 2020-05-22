import * as R from "remeda";
import { Match, MatchItem } from "types";

export default function matchItem(match: Match): MatchItem {
  const item = R.pick(match, [
    "date",
    "competition",
    "teams",
    "score",
    "pen",
    "result",
    "suspended",
  ]);

  // HACK to avoid undefined item.pen
  // FIXME use R.omit?
  if (!match.pen) delete item.pen;
  if (!match.suspended) delete item.suspended;

  return item;
}
