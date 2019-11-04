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
  "Dec"
];

export function formatDate(date, $withYear = false) {
  const d = new Date(date);
  const today = new Date();

  const month = MONTHS[d.getMonth()].toUpperCase();
  const day = `0${d.getDate()}`.slice(-2);

  if ($withYear) {
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return `${day} ${month}`;
}
