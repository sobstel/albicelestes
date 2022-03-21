import { Match } from "~/types";

export default function getMatchTeams(match: Pick<Match, "teams">) {
  const [homeTeam, awayTeam] = match.teams;
  return `${homeTeam.name} - ${awayTeam.name}`;
}
