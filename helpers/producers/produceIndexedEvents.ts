export type TeamIndex = { teamIndex: number };

export default function produceIndexedEvents<T>(
  events: [T[], T[]]
): [(T & TeamIndex)[], (T & TeamIndex)[]] {
  return [
    events[0].map((event) => ({ ...event, teamIndex: 0 })),
    events[1].map((event) => ({ ...event, teamIndex: 1 })),
  ];
}
