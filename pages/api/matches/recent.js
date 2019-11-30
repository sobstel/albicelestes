import { chain, pick } from "lodash";
import data from "db/data";

export default async function handle(req, res) {
  const matches = chain(data)
    .get("matches")
    .takeRight(7)
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
