import * as R from "remeda";
import { Match } from "types";

export default function matchScore(
  match: Pick<Match, "teams" | "score" | "pen" | "suspended">
): string {
  const [homeTeam, awayTeam] = match.teams;

  const teams = `${homeTeam.name} - ${awayTeam.name}`;
  const score = match.suspended ? "*" : match.score.join(":");
  const pen = match.pen && `p.${match.pen.join(":")}`;

  return R.compact([teams, score, pen]).join(" ");
}
