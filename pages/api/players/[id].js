import {
  filter,
  find,
  first,
  flatten,
  flow,
  get,
  map,
  reduce,
  some
} from "lodash";
import data from "db/data";
import getCompetitions from "lib/data/getCompetitions";
import prepareMatches from "lib/data/prepareMatches";

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

  const g = reduce(
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

  return { mp, si, so, g, yc, rc };
}

export default function handle(req, res) {
  const { id } = req.query;

  const fullMatches = filter(data.matches, { lineups: [[{ id }]] });

  const name = getPlayerName(id, fullMatches);
  const matches = prepareMatches(fullMatches);
  const stat = getPlayerStat(id, fullMatches);
  const competitions = getCompetitions(fullMatches);

  res.json({ name, matches, stat, competitions });
}
