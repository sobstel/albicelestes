import {
  each,
  get,
  filter,
  flatten,
  flow,
  map,
  pick,
  reduce,
  reverse,
  sortBy,
  transform,
  values
} from "lodash";
import { MAX_YEAR } from "lib/config";
import data from "db/data";

export default async function handle(req, res) {
  const year = req.query.year || MAX_YEAR;

  const fullMatches = flow(
    data => get(data, "matches"),
    matches => filter(matches, match => match.date.slice(0, 4) == year)
  )(data);

  const matches = map(fullMatches, match =>
    pick(match, [
      "id",
      "date",
      "competition",
      "teams",
      "score",
      "pen",
      "result"
    ])
  );

  const playersStat = sortBy(
    values(
      transform(
        fullMatches,
        (result, match) => {
          const apps = filter(flatten(match.lineups), app => !!app.id);
          each(apps, app => {
            result[app.id] = { name: app.name };
          });
        },
        {}
      )
    ),
    "name"
  );

  res.json({ matches, playersStat });
}
