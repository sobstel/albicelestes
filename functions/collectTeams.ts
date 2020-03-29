import * as R from "remeda";
import * as Util from "lib/util";
import produce from "immer";

export default function collectTeams(
  matches: Pick<Match, "teams">[]
): TeamItem[] {
  return R.pipe(
    matches,
    Util.reverse(),
    R.reduce(
      produce((acc, match) => {
        R.forEach(R.flatten(match.teams), (team: TeamItem) => {
          if (!team.slug) return;
          if (team.slug === "argentina") return;

          if (!acc[team.slug]) {
            acc[team.slug] = { slug: team.slug, name: team.name, mp: 0 };
          }

          acc[team.slug].mp += 1;
        });
      }),
      {} as { [key: string]: TeamItem }
    ),
    Object.values
  );
}
