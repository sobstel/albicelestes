import { findIndex } from "lodash";

export default (grouped, match) => {
  const year = parseInt(match["date"].substring(0, 4), 10);
  let groupIndex = findIndex(grouped, ["year", year]);
  if (groupIndex === -1) {
    const groupedLength = grouped.push({ year: year, matches: [] });
    groupIndex = groupedLength - 1;
  }
  grouped[groupIndex].matches.push(match);
  return grouped;
};
