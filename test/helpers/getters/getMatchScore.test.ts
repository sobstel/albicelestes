import { getMatchScore } from "helpers";
import { Result } from "types";

describe("getMatchScore", () => {
  it("returns team names with score", () => {
    expect(
      getMatchScore({
        teams: [{ name: "Argentina" }, { name: "Uruguay" }],
        score: [3, 1],
        result: Result.Win,
      })
    ).toEqual("Argentina - Uruguay 3:1");
  });

  it("marks game if suspended", () => {
    expect(
      getMatchScore({
        teams: [{ name: "Argentina" }, { name: "Uruguay" }],
        score: [0, 0],
        result: Result.Suspended,
      })
    ).toEqual("Argentina - Uruguay *");
  });

  it("can show penalty score", () => {
    expect(
      getMatchScore({
        teams: [{ name: "Argentina" }, { name: "Uruguay" }],
        score: [1, 1],
        pen: [5, 4],
        result: Result.Win,
      })
    ).toEqual("Argentina - Uruguay 1:1 p.5:4");
  });
});
