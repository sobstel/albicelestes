import {
  filter,
  flatten,
  flow,
  get,
  includes,
  map,
  pick,
  reverse,
  sortBy,
  take,
  transform,
  values
} from "lodash";
import data from "db/data";

const getMatches = flow(
  matches => filter(matches, match => includes(["lk9o5", "xrm53"], match.id)),
  matches =>
    map(matches, match =>
      pick(match, [
        "id",
        "date",
        "competition",
        "teams",
        "score",
        "pen",
        "result"
      ])
    )
);

const getPlayers = flow(
  matches =>
    transform(
      matches,
      (result, match) => {
        flatten(match.lineups).map(app => {
          if (!app.id) return;

          if (!result[app.id]) {
            result[app.id] = { id: app.id, name: app.name, mp: 0 };
          }

          result[app.id].mp += 1;
        });
      },
      {}
    ),
  values,
  players => sortBy(players, player => -player.mp),
  players => take(players, 25)
);

const getTeams = flow(
  reverse,
  matches =>
    transform(
      matches,
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
    ),
  values,
  teams => sortBy(teams, team => -team.mp),
  teams => take(teams, 15)
);

export default async function handle(_req, res) {
  const fullMatches = data.matches;
  const matches = getMatches(fullMatches);
  const players = getPlayers(fullMatches);
  const teams = getTeams(fullMatches);

  res.json({ matches, players, teams });
}
