import { Match } from "~/types";

export default function getMatchYear(match: Pick<Match, "date">): string {
  return match.date.substring(0, 4);
}
