import { chain, pick } from "lodash";
import data from "../../../db/data";

export default async function handle(req, res) {
  const year = req.query.year || new Date().getFullYear();

  const matches = chain(data)
    .get("matches")
    .filter(match => match.date.slice(0, 4) == year)
    .map(match =>
      pick(match, ["id", "date", "competition", "teams", "score", "pen"])
    )
    .reverse()
    .value();

  res.json({ matches });
}
