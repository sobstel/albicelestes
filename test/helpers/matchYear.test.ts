import { matchYear } from "helpers";

describe("matchYear", () => {
  it("returns match year", () => {
    expect(matchYear({ date: "1986-06-29" })).toEqual("1986");
  });
});
