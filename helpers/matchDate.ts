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
export default function matchDate(
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
