import * as R from "remeda";
import * as _R from "lib/remeda";
import immer from "immer";

export default function collectTeams(
  matches: Pick<Match, "teams">[]
): TeamItem[] {
  return R.pipe(
    matches,
    _R.reverse(),
    R.reduce(
      (acc, match) =>
        immer(acc, (draftAcc) => {
          R.forEach(R.flatten(match.teams), (team) => {
            if (!team.slug) return;
            if (team.slug === "argentina") return;

            if (!draftAcc[team.slug]) {
              draftAcc[team.slug] = { slug: team.slug, name: team.name, mp: 0 };
            }

            draftAcc[team.slug].mp += 1;
          });
        }),
      {} as { [key: string]: TeamItem }
    ),
    Object.values
  );
}
