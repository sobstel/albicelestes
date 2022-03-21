import { getMatchTeamIndex } from "~/helpers";
import { Match } from "~/types";

export default function getMatchOtherTeam(match: Pick<Match, "teams">) {
  const myTeamIndex = getMatchTeamIndex(match);
  const otherTeamIndex = 1 - myTeamIndex;
  return match.teams[otherTeamIndex];
}
