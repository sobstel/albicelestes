import { chain, find, pick } from "lodash";
import groupMatchesByDateReducer from "../../../lib/groupMatchesByDateReducer";
import data from "../../../db/data";

export default function handle(req, res) {
  const { id } = req.query;

  const matches = chain(data)
    .get("matches")
    .filter(match => {
      return (
        (match["home_players"] &&
          find(match["home_players"], ["person_id", id])) ||
        (match["away_players"] &&
          find(match["away_players"], ["person_id", id]))
      );
    })
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
    .reduce(groupMatchesByDateReducer, [])
    .reverse()
    .value();

  res.json({ matches });
}
