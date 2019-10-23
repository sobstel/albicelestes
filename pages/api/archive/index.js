import { chain, pick } from "lodash";
import groupMatchesByDateReducer from "../../../lib/groupMatchesByDateReducer";
import data from "../../../db/data";

export default async function handle(_req, res) {
  // TODO: limit by start year and end year
  // res.json({ archive: req.query });

  const archive = chain(data)
    .get("matches")
    .map(match =>
      pick(match, [
        "match_id",
        "date",
        "time",
        "home_name",
        "away_name",
        "ended",
        "ft"
      ])
    )
    .reverse()
    .reduce(groupMatchesByDateReducer, [])
    .value();

  res.json({ archive });
}
