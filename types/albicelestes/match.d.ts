type MatchTeam = { slug: string; name: string } | { name: string; slug?: undefined };

type MatchCoach = { name: string } | null;

type Match = {
  id: string;
  date: string;
  competition: string;
  venue?: { name: string };
  teams: [MatchTeam, MatchTeam];
  score: Score;
  pen?: Score;
  result: "W" | "D" | "L";
  goals: [Goal[], Goal[]];
  cards: [Card[], Card[]];
  coaches: [MatchCoach, MatchCoach];
  lineups: [Appearance[], Appearance[]];
};

type MatchItem = Pick<
  Match,
  "id" | "date" | "competition" | "teams" | "score" | "pen" | "result"
>;

type MatchInfo = {
  youtube?: { id: string }[];
  images?: { url: string; source?: { name: string, url?: string } }[];
  trivia?: string[];
};
