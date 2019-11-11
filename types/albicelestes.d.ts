interface Event {
  id?: string;
  name: string;
  min: string;
  type: string;
}

type GOAL_TYPE = "G" | "P" | "OG";

interface Goal extends Event {
  type: GOAL_TYPE;
}

type CARD_TYPE = "Y" | "R";

interface Card extends Event {
  type: CARD_TYPE;
}

type SCORE = [number, number];
