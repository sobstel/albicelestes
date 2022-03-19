import { collectTeamStat } from "~/helpers";
import { Result } from "~/types";

describe("collectTeamStat", () => {
  const matches: Parameters<typeof collectTeamStat>[0] = [
    {
      teams: [{ name: "Argentina" }, { name: "Brazil" }],
      score: [7, 1],
      result: Result.Win,
    },
    {
      teams: [{ name: "Uruguay" }, { name: "Argentina" }],
      score: [2, 2],
      result: Result.Suspended,
    },
    {
      teams: [{ name: "Argentina" }, { name: "Uruguay" }],
      score: [0, 1],
      result: Result.Loss,
    },
    {
      teams: [{ name: "England" }, { name: "Argentina" }],
      score: [1, 2],
      result: Result.Win,
    },
    {
      teams: [{ name: "Peru" }, { name: "Argentina" }],
      score: [0, 0],
      result: Result.Draw,
    },
  ];

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
