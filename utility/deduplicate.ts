/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */
import * as R from "remeda";

// data-first
export function deduplicate(
  shortNames: string[],
  fn: (name: number) => string
): string[];

// data-last
export function deduplicate<T>(
  fn: (name: number) => string
): (shortNames: string[]) => string[];

export function deduplicate() {
  return R.purry(_deduplicate, arguments);
}

function _deduplicate(
  shortNames: string[],
  fn: (name: number) => string
): string[] {
  const counts = R.reduce(
    shortNames,
    (acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return R.map.indexed(shortNames, (name, index) => {
    return counts[name] > 1 ? fn(index) : name;
  });
}
