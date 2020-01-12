import { flatten, sortBy, transform, values } from "lodash";
import slugify from "slugify";
import { playerName, playerCatalog } from "lib/name";
import data from "db/data";

export default async function handle(req, res) {
  const { catalog } = req.query;

  if (!catalog) return [];

  // fetch all players, which surname starts with "catalog"
  const players = sortBy(
    values(
      transform(
        data.matches,
        (result, match) => {
          flatten(match.lineups).map(app => {
            if (!app.id) return;

            const _catalog = playerCatalog(app.name);
            if (_catalog !== catalog) return;

            if (!result[app.id]) {
              result[app.id] = { id: app.id, name: app.name, mp: 0 };
            }

            result[app.id].mp += 1;
          });
        },
        {}
      )
    ),
    player => {
      const _playerName = playerName(player.name);
      return slugify(
        [
          _playerName.lastName,
          _playerName.firstName,
          _playerName.middleName
        ].join(" "),
        {
          lower: true
        }
      );
    }
  );

  res.json({ players });
}
