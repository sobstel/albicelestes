import { TEAM_SLUG } from "~/config";
import { getTeamSlug } from "~/helpers";
import { Match } from "~/types";

export default function getMatchTeamIndex(
  match: Pick<Match, "teams">,
  slug: string = TEAM_SLUG
): 0 | 1 {
  return getTeamSlug(match.teams[0]) === slug ? 0 : 1;
}
