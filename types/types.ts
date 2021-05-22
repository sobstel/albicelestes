import {
  Array,
  Boolean,
  Dictionary,
  Literal,
  Null,
  Number,
  Optional,
  Record,
  Static,
  String,
  Tuple,
  Union,
} from "runtypes";

export type Appearance = Static<typeof rtAppearance>;
export type Bibliography = Static<typeof rtBibliography>;
export type Card = Static<typeof rtCard>;
export type Goal = Static<typeof rtGoal>;
export type InfoLink = Static<typeof rtInfoLink>;
export type Match = Static<typeof rtMatch>;
export type MatchCoach = Static<typeof rtMatchCoach>;
export type MatchItem = Static<typeof rtMatchItem>;
export type MatchTeam = Static<typeof rtMatchTeam>;
export type PenScore = Static<typeof rtPenScore>;
export enum Result {
  Win = "W",
  Draw = "D",
  Loss = "L",
  Suspended = "S",
}
export type Score = Static<typeof rtScore>;
export type Team = Static<typeof rtTeam>;
export type TeamItem = Static<typeof rtTeamItem>;

const rtBibliographyItem = Record({ name: String, url: Optional(String) });
const rtBibliography = Dictionary(rtBibliographyItem, String);

const rtTeam = Record({ name: String, slug: Optional(String) });
const rtTeamItem = rtTeam.And(Record({ mp: Number }));
const rtMatchTeam = rtTeam;

const rtScore = Tuple(Number, Number);

const rtPenScore = Union(rtScore, Literal("x"));

const rtResult = Union(Literal("W"), Literal("D"), Literal("L"), Literal("S"));

const rtGoal = Record({
  name: String,
  min: Optional(String),
  type: Union(Literal("G"), Literal("P"), Literal("OG")),
});

const rtCard = Record({
  name: String,
  min: Optional(String),
  type: Union(Literal("Y"), Literal("R")),
});

const rtMatchCoach = Record({ name: String }).Or(Null);

const rtAppearance = Record({
  name: String,
  in: Optional(String),
  out: Optional(String),
});

const rtInfoLink = Record({
  url: String,
  text: String,
  desc: Optional(String),
});

export const rtMatch = Record({
  slug: Optional(String),
  date: String,
  competition: String,
  round: Optional(String),
  venue: Optional(Record({ name: String, city: Optional(String) })),
  teams: Tuple(rtMatchTeam, rtMatchTeam),
  score: rtScore,
  aet: Optional(Boolean),
  pen: Optional(rtScore),
  result: rtResult,
  goals: Tuple(Array(rtGoal), Array(rtGoal)),
  cards: Optional(Tuple(Array(rtCard), Array(rtCard))),
  coaches: Optional(Tuple(rtMatchCoach, rtMatchCoach)),
  lineups: Tuple(Array(rtAppearance), Array(rtAppearance)),
  penaltyShootout: Optional(Array(Record({ name: String, score: rtPenScore }))),
  notes: Optional(Array(String)),
  sources: Optional(Array(String)),
  info: Optional(
    Record({
      youtube: Optional(Array(Record({ id: String }))),
      images: Optional(
        Array(
          Record({
            url: String,
            source: Optional(Record({ name: String, url: Optional(String) })),
          })
        )
      ),
      trivia: Optional(Array(String)),
      links: Optional(Array(rtInfoLink)),
    })
  ),
});

const rtMatchItem = rtMatch.pick(
  "slug",
  "date",
  "competition",
  "teams",
  "score",
  "pen",
  "result",
  "sources"
);

export type PlayerInfo = {
  nicknames?: string[];
  links?: InfoLink[];
};

export type PlayerItem = {
  name: string;
  mp: number;
  si: number;
  so: number;
  g: number;
};

export type PlayerName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type PlayerStat = {
  mp: number;
  si: number;
  so: number;
  g: number;
  yc: number;
  rc: number;
};

export type TeamStat = {
  mp: number;
  mw: number;
  md: number;
  ml: number;
  gf: number;
  ga: number;
};
