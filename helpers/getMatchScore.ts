import * as R from "remeda";
import { Match, Result } from "types";

type MatchScoreOpts = {
  withTeams?: boolean;
  short?: true;
};

// TODO: it should return score only just as it says -> extract getMatchTeams?
export default function getMatchScore(
  match: Pick<Match, "teams" | "score" | "pen" | "result">,
  localOpts: MatchScoreOpts = {}
): string {
  const opts = { withTeams: true, short: false, ...localOpts };

  const [homeTeam, awayTeam] = match.teams;

  const teams = opts.withTeams && `${homeTeam.name} - ${awayTeam.name}`;
  let score = match.result === Result.Suspended ? "*" : match.score.join(":");
  const pen = match.pen && `p.${match.pen.join(":")}`;

  if (opts.short && match.pen) {
    score = "";
  }

  return R.compact([teams, score, pen]).join(" ");
}
