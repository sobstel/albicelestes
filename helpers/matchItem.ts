import * as R from "remeda";

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
  if (!match.pen) delete item.pen;

  return item;
}
