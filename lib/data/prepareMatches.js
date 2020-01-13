import { map, pick } from "lodash";

export default function prepareMatches(matches) {
  return map(matches, match =>
    pick(match, [
      "id",
      "date",
      "competition",
      "teams",
      "score",
      "pen",
      "result"
    ])
  );
}
