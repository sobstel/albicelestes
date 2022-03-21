import { getMatchYear } from "~/helpers";

describe("getMatchYear", () => {
  it("returns match year", () => {
    expect(getMatchYear({ date: "1986-06-29" })).toEqual("1986");
  });
});
