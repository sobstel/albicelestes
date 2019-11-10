import { chain, find, pick } from "lodash";
import data from "../../../db/data";

export default function handle(req, res) {
  const { id } = req.query;

  const matches = chain(data)
    .get("matches")
    .filter({ lineups: [[{ id }]] })
    .map(match =>
      pick(match, [
        "id",
        "date",
        "competition",
        "teams",
        "score",
        "pen",
        "result",
        "goals"
      ])
    )
    .reverse()
    .value();

  res.json({ matches });
}
