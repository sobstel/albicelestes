import { hyenaDB as db } from "../../../lib/db";

export default function handle(req, res) {
  const { id } = req.query;

  const match = db
    .get("matches")
    .find({ match_id: id })
    .value();

  res.json({ match });
}
