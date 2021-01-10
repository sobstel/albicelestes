import * as R from "remeda";
import { Match } from "types";

export default function getMatchScore(
  match: Pick<Match, "teams" | "score" | "pen" | "result">
): string {
  const [homeTeam, awayTeam] = match.teams;

  const teams = `${homeTeam.name} - ${awayTeam.name}`;
  const score = match.result === "S" ? "*" : match.score.join(":");
  const pen = match.pen && `p.${match.pen.join(":")}`;

  return R.compact([teams, score, pen]).join(" ");
}
