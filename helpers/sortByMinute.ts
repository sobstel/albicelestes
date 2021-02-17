import * as R from "remeda";

export default function sortByMinute<T extends { min?: string }>(
  items: T[]
): T[] {
  return R.sortBy(items, (item) => {
    if (!item?.min) return false;

    // 50 => 050+000, 90+2 => 090+002, 120+1 => 120+001
    return String(item.min)
      .split("+")
      .map((part) => part.padStart(3, "0"))
      .join("+");
  });
}
