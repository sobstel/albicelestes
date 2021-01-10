import slugify from "slugify";
import { Team } from "types";

export default function getTeamSlug(team: Team): string {
  if (team.slug) {
    return team.slug;
  }

  return slugify(team.name, { lower: true });
}
