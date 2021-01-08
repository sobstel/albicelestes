import { Match } from "types";
import { TEAM_SLUG } from "config";
import { teamSlug } from "helpers";

export default function matchTeamIndex(
  match: Pick<Match, "teams">,
  slug: string = TEAM_SLUG
): 0 | 1 {
  return teamSlug(match.teams[0]) === slug ? 0 : 1;
}
