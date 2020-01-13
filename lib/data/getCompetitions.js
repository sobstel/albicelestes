import { flow, includes, map, reject, uniq } from "lodash";

export default function getCompetitions(matches) {
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
