export default function matchYear(match: Pick<Match, "date">): string {
  return match.date.substring(0, 4);
}
