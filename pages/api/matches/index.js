import { get, filter, flow, map, pick, reverse } from "lodash";
import { MAX_YEAR } from "lib/config";
import data from "db/data";

export default async function handle(req, res) {
  const year = req.query.year || MAX_YEAR;

  const matches = flow(
    data => get(data, "matches"),
    matches => filter(matches, match => match.date.slice(0, 4) == year),
    matches =>
      map(matches, match =>
        pick(match, [
          "id",
          "date",
          "competition",
          "teams",
          "score",
          "pen",
          "result"
        ])
      )
  )(data);

  res.json({ matches });
}
