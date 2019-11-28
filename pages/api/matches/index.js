import { chain, pick } from "lodash";
import { MAX_YEAR } from "lib/config";
import data from "db/data";

export default async function handle(req, res) {
  const year = req.query.year || MAX_YEAR;

  const matches = chain(data)
    .get("matches")
    .filter(match => match.date.slice(0, 4) == year)
    .map(match =>
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
    .reverse()
    .value();

  res.json({ matches });
}
