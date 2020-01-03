import {
  filter,
  find,
  first,
  flatten,
  flow,
  get,
  includes,
  map,
  pick,
  reduce,
  reject,
  uniq
} from "lodash";
import data from "db/data";

function getPlayerMatches(id, data) {
  return flow(
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
}

function getCompetitions(matches) {
  return flow(
    matches =>
      reject(
        matches,
        match =>
          includes(match.competition, "Friendly") ||
          includes(match.competition, "World Cup Quals")
      ),
    matches =>
      map(
        matches,
        match => `${match.competition} ${match.date.substring(0, 4)}`
      ),
    uniq
  )(matches);
}

function getPlayerName(id, data) {
  return flow(
    data => get(data, "matches"),
    matches => find(matches, { lineups: [[{ id }]] }),
    match => get(match, "lineups"),
    flatten,
    players => find(players, { id }),
    player => get(player, "name")
  )(data);
}

function getPlayerStat(id, matches) {
  const mp = matches.length;

  const [mw, md, ml] = ["W", "D", "L"].map(result => {
    return matches.filter(match => match.result === result).length;
  });

  const goals = reduce(
    matches,
    (count, match) => {
      return (
        count +
        filter(
          flatten(match.goals),
          goal => goal.id === id && goal.type !== "OG"
        ).length
      );
    },
    0
  );

  return { mp, mw, md, ml, goals };
}

export default function handle(req, res) {
  const { id } = req.query;

  const name = getPlayerName(id, data);
  const matches = getPlayerMatches(id, data);

  const stat = getPlayerStat(id, matches);
  const competitions = getCompetitions(matches);

  res.json({ name, matches, stat, competitions });
}
