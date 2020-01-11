import { flatten, transform, values } from "lodash";
import slugify from "slugify";
// import { MAX_YEAR } from "lib/config";
import data from "db/data";

export default async function handle(req, res) {
  const { catalog } = req.query;

  // TODO: return most capped and most goals if no catalog
  if (!catalog) return [];

  // fetch all players, which surname starts with "catalog"
  const players = values(
    transform(
      data.matches,
      (result, match) => {
        flatten(match.lineups).map(app => {
          if (!app.id) return;

          const slug = slugify(app.name, { lower: true });

          // TODO: move to some lib
          // @ts-ignore
          const slugCatalog = slug
            .split("-", 2)
            .pop()
            .toString()[0];

          if (slugCatalog !== catalog) return;

          if (!result[app.id]) {
            result[app.id] = { id: app.id, name: app.name, mp: 0 };
          }

          result[app.id].mp += 1;
        });
      },
      {}
    )
  );
  res.json({ players });
}
