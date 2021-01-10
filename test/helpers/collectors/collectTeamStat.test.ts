import { collectTeamStat } from "helpers";

describe("collectTeamStat", () => {
  const matches = [
    {
      teams: [{ name: "Argentina" }, { name: "Brazil" }],
      score: [7, 1],
      result: "W",
    },
    {
      teams: [{ name: "Uruguay" }, { name: "Argentina" }],
      score: [2, 2],
      result: "D",
      suspended: true,
    },
    {
      teams: [{ name: "Argentina" }, { name: "Uruguay" }],
      score: [0, 1],
      result: "L",
    },
    {
      teams: [{ name: "England" }, { name: "Argentina" }],
      score: [1, 2],
      result: "W",
    },
    {
      teams: [{ name: "Peru" }, { name: "Argentina" }],
      score: [0, 0],
      result: "D",
    },
  ] as Parameters<typeof collectTeamStat>[0];

  it("works correctly", () => {
    expect(collectTeamStat(matches)).toEqual({
      mp: 4,
      mw: 2,
      md: 1,
      ml: 1,
      gf: 9,
      ga: 3,
    });
  });
});
