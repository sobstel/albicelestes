import { chain, pick, findIndex } from "lodash";
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
    .reduce((grouped, match) => {
      const year = parseInt(match["date"].substring(0, 4), 10);
      let groupIndex = findIndex(grouped, ["year", year]);
      if (groupIndex === -1) {
        const groupedLength = grouped.push({ year: year, matches: [] });
        groupIndex = groupedLength - 1;
      }
      grouped[groupIndex].matches.push(match);
      return grouped;
    }, [])
    .value();

  res.json({ archive });
}
