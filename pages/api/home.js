import {
  filter,
  flow,
  get,
  includes,
  map,
  pick,
  reverse,
  takeRight
} from "lodash";
import data from "db/data";

function pickMatch(match) {
  return pick(match, [
    "id",
    "date",
    "competition",
    "teams",
    "score",
    "pen",
    "result"
  ]);
}

export default async function handle(_req, res) {
  const recentMatches = flow(
    data => get(data, "matches"),
    matches => takeRight(matches, 7),
    matches => map(matches, pickMatch)
  )(data);

  const majorMatches = flow(
    data => get(data, "matches"),
    matches =>
      filter(matches, match =>
        includes(["lk9o5", "xrm53", "k3ype", "d5lq7", "0ldxk"], match.id)
      ),
    matches => map(matches, pickMatch)
  )(data);

  res.json({ recentMatches, majorMatches });
}
