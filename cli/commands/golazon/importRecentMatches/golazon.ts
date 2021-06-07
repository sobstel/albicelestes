export type Person = { person_id: string; name: string };
export type Player = Person & { in?: string; out?: string };
export type Coach = Person | null;
export type Goal = Person & {
  code: "G" | "PG" | "OG";
  score: [number, number];
  min: string;
};
export type Card = Person & { code: "YC" | "RC" | "Y2C"; min: string };
type Score = [number, number];

export type Match = {
  match_id: string;
  date: string;
  time: string;
  home_id: string;
  home_name: string;
  away_id: string;
  away_name: string;
  ended?: boolean;
  suspended?: boolean;
  postponed?: boolean;
  ft: Score;
  ht: Score;
  ps?: Score;
  goals: Array<Goal>;
  cards: Array<Card>;
  home_players: Array<Player>;
  home_coach: Person;
  away_players: Array<Player>;
  away_coach: Person;
  competition_id: string;
  competition_name: string;
  area_name: string;
  round_name: string;
  teamtype: string | null;
  venue: { name: string; city: string };
  penalty_shootout: Array<Person & { code: "G" | "M"; score: Score }>;
};

export type Team = {
  recentFixtures: Array<{ match_id: string; date: string }>;
};
