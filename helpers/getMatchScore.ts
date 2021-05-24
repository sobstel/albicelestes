import * as R from "remeda";
import { Match, Result } from "types";

type MatchScoreOpts = {
  short?: boolean;
};

// TODO: it should return score only just as it says -> extract getMatchTeams?
export default function getMatchScore(
  match: Pick<Match, "teams" | "score" | "aet" | "pen" | "result">,
  localOpts: MatchScoreOpts = {}
): string {
  const opts = { short: false, ...localOpts };

  let score = match.result === Result.Suspended ? "*" : match.score.join(":");
  const pen = match.pen && `p.${match.pen.join(":")}`;

  if (opts.short && match.pen) {
    score = "";
  }

  const aet = !opts.short && !match.pen && match.aet && "aet";

  return R.compact([score, aet, pen]).join(" ");
}
