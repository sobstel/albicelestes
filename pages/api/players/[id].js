import {
  countBy,
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
  some,
  uniq
} from "lodash";
import data from "db/data";

function preparePlayerMatches(matches) {
  return map(matches, match =>
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
  );
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

function getPlayerName(id, matches) {
  return flow(
    first,
    match => get(match, "lineups"),
    flatten,
    players => find(players, { id }),
    player => get(player, "name")
  )(matches);
}

function getPlayerStat(id, matches) {
  const mp = matches.length;

  const [si, so] = ["in", "out"].map(
    type =>
      filter(matches, match =>
        some(flatten(match.lineups), player => player.id === id && player[type])
      ).length
  );

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

  const [yc, rc] = ["Y", "R"].map(
    type =>
      filter(matches, match =>
        some(flatten(match.cards), card => card.id === id && card.type === type)
      ).length
  );

  return { mp, si, so, goals, yc, rc };
}

export default function handle(req, res) {
  const { id } = req.query;

  const fullMatches = filter(data.matches, { lineups: [[{ id }]] });

  const name = getPlayerName(id, fullMatches);
  const matches = preparePlayerMatches(fullMatches);
  const stat = getPlayerStat(id, fullMatches);
  const competitions = getCompetitions(fullMatches);

  res.json({ name, matches, stat, competitions });
}
