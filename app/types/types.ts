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
export type CoachItem = Static<typeof rtCoachItem>;
export type Goal = Static<typeof rtGoal>;
export type InfoLink = Static<typeof rtInfoLink>;
export type Match = Static<typeof rtMatch>;
export type MatchCoach = Static<typeof rtMatchCoach>;
export type MatchItem = Static<typeof rtMatchItem>;
// export type MatchTeam = Static<typeof rtMatchTeam>;
export type PenScore = Static<typeof rtPenScore>;
export type PlayerInfo = Static<typeof rtPlayerInfo>;
export type PlayerItem = Static<typeof rtPlayerItem>;
export type PlayerName = Static<typeof rtPlayerName>;
export type PlayerStat = Static<typeof rtPlayerStat>;
export enum Result {
  Win = "W",
  Draw = "D",
  Loss = "L",
  Suspended = "S",
}
export type Score = Static<typeof rtScore>;
export type Team = Static<typeof rtTeam>;
export type TeamItem = Static<typeof rtTeamItem>;
export type TeamStat = Static<typeof rtTeamStat>;

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

const rtPlayerInfo = Record({
  nicknames: Optional(Array(String)),
  links: Optional(Array(rtInfoLink)),
});

const rtPlayerItem = Record({
  name: String,
  mp: Number,
  si: Number,
  so: Number,
  g: Number,
});

const rtPlayerName = Record({
  firstName: String,
  middleName: String,
  lastName: String,
});

const rtPlayerStat = Record({
  mp: Number,
  si: Number,
  so: Number,
  g: Number,
  yc: Number,
  rc: Number,
});

const rtTeamStat = Record({
  mp: Number,
  mw: Number,
  md: Number,
  ml: Number,
  gf: Number,
  ga: Number,
});

const rtCoachItem = Record({
  name: String,
});
