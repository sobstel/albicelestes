import { getMatchScore } from "helpers";
import { Result } from "types";

describe("getMatchScore", () => {
  it("returns team names with score", () => {
    expect(
      getMatchScore({
        score: [3, 1],
        result: Result.Win,
      })
    ).toEqual("3:1");
  });

  it("marks game if suspended", () => {
    expect(
      getMatchScore({
        score: [0, 0],
        result: Result.Suspended,
      })
    ).toEqual("*");
  });

  it("can show penalty score", () => {
    expect(
      getMatchScore({
        score: [1, 1],
        pen: [5, 4],
        result: Result.Win,
      })
    ).toEqual("1:1 p.5:4");
  });
});
