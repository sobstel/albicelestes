import * as R from "remeda";

export default function seoDescription(
  parts: Array<string | undefined>
): string {
  return R.compact(parts).join(". ");
}
