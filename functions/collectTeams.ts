import * as R from "remeda";
import { Match, TeamItem } from "types";

export default function collectTeams(
  matches: Pick<Match, "teams">[]
): TeamItem[] {
  return R.pipe(
    matches,
    R.reverse(),
    R.reduce((acc, match) => {
      R.forEach(R.flatten(match.teams), (team) => {
        if (!team.slug) return;
        if (team.slug === "argentina") return;

        if (!acc[team.slug]) {
          acc[team.slug] = { slug: team.slug, name: team.name, mp: 0 };
        }

        acc[team.slug].mp += 1;
      });
      return acc;
    }, {} as { [key: string]: TeamItem }),
    Object.values
  );
}
