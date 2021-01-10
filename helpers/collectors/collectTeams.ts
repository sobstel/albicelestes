import * as R from "remeda";
import { Match, TeamItem } from "types";
import { getMatchTeamIndex, getTeamSlug } from "helpers";

export default function collectTeams(
  matches: Pick<Match, "teams">[]
): TeamItem[] {
  return R.pipe(
    matches,
    R.reverse(),
    R.reduce((acc, match) => {
      const otherTeamIndex = 1 - getMatchTeamIndex(match);
      const otherTeam = match.teams[otherTeamIndex];
      const slug = getTeamSlug(otherTeam);

      if (!acc[slug]) {
        acc[slug] = { slug, name: otherTeam.name, mp: 0 };
      }

      acc[slug].mp += 1;

      return acc;
    }, {} as { [key: string]: TeamItem }),
    Object.values
  );
}
