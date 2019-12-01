import { flow, get, map, pick, reverse, takeRight } from "lodash";
import data from "db/data";

export default async function handle(_req, res) {
  const matches = flow(
    (data) => get(data, "matches"),
    (matches) => takeRight(matches, 7),
    (matches) => map(matches, match =>
      pick(match, [
        "id",
        "date",
        "competition",
        "teams",
        "score",
        "pen",
        "result"
      ])
    ),
    reverse
  )(data);

  res.json({ matches });
}
