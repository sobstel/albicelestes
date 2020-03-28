import slugify from "slugify";

// FIXME: teams as a input arg
export default function matchSlug(match: Pick<Match, "teams">): string {
  const [homeTeam, awayTeam] = match.teams;
  const homeSlug = homeTeam.slug || slugify(homeTeam.name, { lower: true });
  const awaySlug = awayTeam.slug || slugify(awayTeam.name, { lower: true });

  return `${homeSlug}-${awaySlug}`;
}
