import * as R from "remeda";
import { Match, MatchItem } from "types";

export default function matchItem(match: Match): MatchItem {
  const item = R.pick(match, [
    "id",
    "date",
    "competition",
    "teams",
    "score",
    "pen",
    "result",
  ]);

  // HACK to avoid undefined item.pen
  // FIXME use R.omit?
  if (!match.pen) delete item.pen;

  return item;
}
