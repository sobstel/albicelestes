import slugify from "slugify";
import { Match } from "types";

export default function getMatchSlug(
  match: Pick<Match, "slug" | "teams">
): string {
  if (match.slug) {
    return match.slug;
  }

  const [homeTeam, awayTeam] = match.teams;
  const homeSlug = homeTeam.slug || slugify(homeTeam.name, { lower: true });
  const awaySlug = awayTeam.slug || slugify(awayTeam.name, { lower: true });

  return `${homeSlug}-${awaySlug}`;
}
