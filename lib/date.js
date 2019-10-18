// normalize date to UTC before converting
export function normalizeDate(date, time) {
  const y = date.slice(0, 4);
  const m = date.slice(5, 7) - 1;
  const d = date.slice(8, 10);
  const hr = time.slice(0, 2);
  const mn = time.slice(3, 5);

  return new Date(Date.UTC(y, m, d, hr, mn, 0));
}

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

export function formatDate(date, time, $withYear = false) {
  const d = normalizeDate(date, time);
  const today = new Date();

  const month = MONTHS[d.getMonth()].toUpperCase();
  const day = `0${d.getDate()}`.slice(-2);

  if ($withYear) {
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return `${day} ${month}`;
}

export function formatTime(date, time) {
  const d = normalizeDate(date, time);

  const hour = `0${d.getHours()}`.slice(-2);
  const min = `0${d.getMinutes()}`.slice(-2);

  return `${hour}:${min}`;
}
