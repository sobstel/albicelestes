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
import slugify from "slugify";
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
            // TODO: should be also called for goals and card below (just to be safe)
            if (!result[app.id]) {
              result[app.id] = {
                id: app.id,
                name: app.name,
                slug: slugify(app.name, { lower: true }),
                mp: 0,
                si: 0,
                so: 0,
                g: 0,
                yc: 0,
                rc: 0
              };
            }
            result[app.id].mp += 1;
            if (app.in) {
              result[app.id].si += 1;
            }
            if (app.out) {
              result[app.id].so += 1;
            }
          });

          const goals = filter(
            flatten(match.goals),
            goal => goal.id && goal.type !== "OG"
          );
          each(goals, goal => {
            result[goal.id].g += 1;
          });

          const cards = filter(flatten(match.cards), card => !!card.id);
          each(cards, card => {
            if (card.type == "Y") {
              result[card.id].yc += 1;
            }
            if (card.type == "R") {
              result[card.id].rc += 1;
            }
          });
        },
        {}
      )
    ),
    "slug"
  );

  res.json({ matches, playersStat });
}
