import {
  countBy,
  filter,
  find,
  first,
  flatten,
  flow,
  get,
  map,
  pick,
  transform
} from "lodash";
import data from "db/data";
import getCompetitions from "lib/data/getCompetitions";
import prepareMatches from "lib/data/prepareMatches";

function getTeamName(slug, matches) {
  return flow(
    first,
    match => get(match, "teams"),
    flatten,
    teams => find(teams, { slug }),
    team => get(team, "name")
  )(matches);
}

function getTeamStat(slug, matches) {
  const mp = matches.length;
  const { W: mw, D: md, L: ml } = countBy(matches, "result");

  const { gf, ga } = transform(
    matches,
    (stat, match) => {
      const otherTeamIndex = match.teams.findIndex(
        team => team.slug !== "argentina"
      );

      stat.gf += match.score[1 - otherTeamIndex];
      stat.ga += match.score[otherTeamIndex];
    },
    { gf: 0, ga: 0 }
  );

  return { mp, mw, md, ml, gf, ga };
}

export default async function handle(req, res) {
  const { slug } = req.query;

  const fullMatches = filter(data.matches, { teams: [{ slug }] });

  const name = getTeamName(slug, fullMatches);
  const matches = prepareMatches(fullMatches);
  const competitions = getCompetitions(fullMatches);
  const stat = getTeamStat(slug, fullMatches);

  res.json({ name, matches, competitions, stat });
}
