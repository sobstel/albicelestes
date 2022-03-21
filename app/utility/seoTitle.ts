import * as R from "remeda";

export default function seoTitle(parts: Array<string | undefined>): string {
  return R.compact([...parts, "Albicelestes"]).join(" / ");
}
