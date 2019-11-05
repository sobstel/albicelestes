import { chain, pick } from "lodash";
import groupMatchesByDateReducer from "../../../lib/groupMatchesByDateReducer";
import data from "../../../db/data";

export default async function handle(req, res) {
  // TODO: limit by start year and end year
  let { year } = req.query;
  if (!year) {
    year = new Date().getFullYear();
  }

  const archive = chain(data)
    .get("matches")
    .filter(match => match.date.slice(0, 4) == year)
    .map(match => pick(match, ["id", "date", "teams", "score", "pen"]))
    .reverse()
    .reduce(groupMatchesByDateReducer, [])
    .value();

  res.json({ archive });
}
