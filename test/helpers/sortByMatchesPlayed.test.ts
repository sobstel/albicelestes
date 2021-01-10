import { sortByMatchesPlayed } from "helpers";

describe("sortByMatchesPlayed", () => {
  const items = [
    { mp: 23 },
    { mp: 8 },
    { mp: 4 },
    { mp: 42 },
    { mp: 15 },
    { mp: 16 },
  ];

  it("sorts items by mp desc", () => {
    expect(sortByMatchesPlayed(items)).toEqual([
      { mp: 42 },
      { mp: 23 },
      { mp: 16 },
      { mp: 15 },
      { mp: 8 },
      { mp: 4 },
    ]);
  });
});
