type Team = { slug: string; name: string };

type Match = {
  id: string;
  date: string;
  competition: string;
  venue?: { name: string };
  teams: [Team, Team];
  score: Score;
  result: "W" | "D" | "L";
  goals: [Goal[], Goal[]];
  cards: [Card[], Card[]];
  coaches: [string?, string?];
  lineups: [Appearance[], Appearance[]];
};
