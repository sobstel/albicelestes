import { flatten, reverse, sortBy, transform, values } from "lodash";
import data from "db/data";

export default async function handle(req, res) {
  const teams = sortBy(
    values(
      transform(
        // reverse to have most actual team name eg Germany vs West Germany
        reverse(data.matches),
        (result, match) => {
          flatten(match.teams).map(team => {
            if (!team.slug) return;
            if (team.slug === "argentina") return;

            if (!result[team.slug]) {
              result[team.slug] = { slug: team.slug, name: team.name, mp: 0 };
            }

            result[team.slug].mp += 1;
          });
        },
        {}
      )
    ),
    team => team.name
  );

  res.json({ teams });
}
