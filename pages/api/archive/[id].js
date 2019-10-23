import { chain } from "lodash";
import data from "../../../db/data";

export default function handle(req, res) {
  const { id } = req.query;

  const match = chain(data)
    .get("matches")
    .find({ match_id: id })
    .value();

  res.json({ match });
}
