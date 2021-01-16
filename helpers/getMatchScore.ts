import * as R from "remeda";
import { Match, Result } from "types";

type MatchScoreOpts = {
  withTeams?: boolean;
};

export default function getMatchScore(
  match: Pick<Match, "teams" | "score" | "pen" | "result">,
  localOpts: MatchScoreOpts = {}
): string {
  const opts = { withTeams: true, ...localOpts };

  const [homeTeam, awayTeam] = match.teams;

  const teams = opts.withTeams && `${homeTeam.name} - ${awayTeam.name}`;
  const score = match.result === Result.Suspended ? "*" : match.score.join(":");
  const pen = match.pen && `p.${match.pen.join(":")}`;

  return R.compact([teams, score, pen]).join(" ");
}
