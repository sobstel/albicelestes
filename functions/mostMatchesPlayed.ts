import * as R from "remeda";

type Item = { mp: number };

export default function mostMatchesPlayed<T extends Item>(items: T[]): T[] {
  return R.sortBy(items, (item) => -item.mp);
}
