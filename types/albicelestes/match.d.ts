type Team = { slug: string; name: string; } | { name: string; slug?: undefined; };

type Match = {
  id: string;
  date: string;
  competition: string;
  venue?: { name: string };
  teams: [Team, Team];
  score: Score;
  pen?: Score;
  result: "W" | "D" | "L";
  goals: [Goal[], Goal[]];
  cards: [Card[], Card[]];
  coaches: [string?, string?];
  lineups: [Appearance[], Appearance[]];
};

type PartialMatch = Pick<Match, "id" | "date" | "competition" | "teams" | "score" | "pen" | "result">;

