import { Match } from "types";
import { getMatchTeamIndex } from "helpers";

export default function getMatchOtherTeam(match: Pick<Match, "teams">) {
  const myTeamIndex = getMatchTeamIndex(match);
  const otherTeamIndex = 1 - myTeamIndex;
  return match.teams[otherTeamIndex];
}
