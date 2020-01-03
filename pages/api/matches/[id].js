import { find, flow, get } from "lodash";
import data from "db/data";

export default function handle(req, res) {
  const { id } = req.query;

  const match = flow(
    data => get(data, "matches"),
    matches => find(matches, { id })
  )(data);

  res.json({ match });
}
