import { chain, find, pick } from "lodash";
import groupMatchesByDateReducer from "../../../lib/groupMatchesByDateReducer";
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
        "teams",
        "score",
        "pen"
      ])
    )
    .reverse()
    .reduce(groupMatchesByDateReducer, [])
    .value();

  res.json({ matches });
}
