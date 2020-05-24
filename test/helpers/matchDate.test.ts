import { matchDate } from "helpers";

describe("matchDate", () => {
  it("returns match date (day/month)", () => {
    expect(matchDate({ date: "1986-06-29" })).toEqual("29 JUN");
  });

  it("can return match date with year", () => {
    expect(matchDate({ date: "1986-06-29" }, { withYear: true })).toEqual(
      "29 JUN 1986"
    );
  });

  it("can return match date with year (no uppercased)", () => {
    expect(
      matchDate({ date: "1986-06-29" }, { withYear: true, uppercase: false })
    ).toEqual("29 Jun 1986");
  });
});
