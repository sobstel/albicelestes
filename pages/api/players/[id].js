import { filter, find, first, flatten, flow, get, map, pick } from "lodash";
import data from "db/data";

export default function handle(req, res) {
  const { id } = req.query;

  const matches = flow(
    data => get(data, "matches"),
    matches => filter(matches, { lineups: [[{ id }]] }),
    matches =>
      map(matches, match =>
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
  )(data);

  const name = flow(
    data => get(data, "matches"),
    matches => filter(matches, { lineups: [[{ id }]] }),
    first,
    match => get(match, "lineups"),
    flatten,
    players => find(players, { id }),
    player => get(player, "name")
  )(data);

  res.json({ name, matches });
}
