import * as R from "remeda";
import slugify from "slugify";

export function matchItem(match: Match): MatchItem {
  const item = R.pick(match, [
    "id",
    "date",
    "competition",
    "teams",
    "score",
    "pen",
    "result",
  ]);

  // HACK to avoid undefined item.pen
  if (!match.pen) delete item.pen;

  return item;
}

type MatchDateOpts = {
  withYear?: boolean;
  uppercase?: boolean;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// FIXME: date as an input arg
export function matchDate(
  match: Pick<Match, "date">,
  localOpts: MatchDateOpts = {}
): string {
  const { date } = match;
  const opts = { withYear: false, uppercase: true, ...localOpts };
  const d = new Date(date);

  let month = MONTHS[d.getMonth()];
  if (opts.uppercase) {
    month = month.toUpperCase();
  }

  const day = `0${d.getDate()}`.slice(-2);

  if (opts.withYear) {
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return `${day} ${month}`;
}

export function matchYear(match: Pick<Match, "date">): string {
  return match.date.substring(0, 4);
}

// FIXME: teams as a input arg
export function matchSlug(match: Pick<Match, "teams">): string {
  const [homeTeam, awayTeam] = match.teams;
  const homeSlug = homeTeam.slug || slugify(homeTeam.name, { lower: true });
  const awaySlug = awayTeam.slug || slugify(awayTeam.name, { lower: true });

  return `${homeSlug}-${awaySlug}`;
}
