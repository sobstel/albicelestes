// import {} from "lodash";
// import slugify from "slugify";
// import { MAX_YEAR } from "lib/config";
import data from "db/data";

export default async function handle(req, res) {
  const { catalog } = req.query.catalog;

  // TODO: return most capped and most goals if no catalog
  if (!catalog) return {};

  // fetch all players, which surname starts with "catalog"
  const players = {};

  res.json({ players });
}
