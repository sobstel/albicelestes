import { getMatchTeamIndex } from "~/helpers";

describe("getMatchTeamIndex", () => {
  it("determines team index using default slug", () => {
    expect(
      getMatchTeamIndex({ teams: [{ name: "Argentina" }, { name: "Uruguay" }] })
    ).toEqual(0);
    expect(
      getMatchTeamIndex({ teams: [{ name: "Uruguay" }, { name: "Argentina" }] })
    ).toEqual(1);
  });

  it("determines team index using provided slug", () => {
    expect(
      getMatchTeamIndex(
        { teams: [{ name: "Argentina" }, { name: "Uruguay" }] },
        "uruguay"
      )
    ).toEqual(1);
    expect(
      getMatchTeamIndex(
        { teams: [{ name: "Uruguay" }, { name: "Argentina" }] },
        "uruguay"
      )
    ).toEqual(0);
  });
});
