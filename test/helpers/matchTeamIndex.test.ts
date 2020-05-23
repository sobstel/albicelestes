import { matchTeamIndex } from "helpers";

describe("matchTeamIndex", () => {
  it("determines team index using default slug", () => {
    expect(
      matchTeamIndex({ teams: [{ name: "Argentina" }, { name: "Uruguay" }] })
    ).toEqual(0);
    expect(
      matchTeamIndex({ teams: [{ name: "Uruguay" }, { name: "Argentina" }] })
    ).toEqual(1);
  });

  it("determines team index using provided slug", () => {
    expect(
      matchTeamIndex(
        { teams: [{ name: "Argentina" }, { name: "Uruguay" }] },
        "uruguay"
      )
    ).toEqual(1);
    expect(
      matchTeamIndex(
        { teams: [{ name: "Uruguay" }, { name: "Argentina" }] },
        "uruguay"
      )
    ).toEqual(0);
  });
});
