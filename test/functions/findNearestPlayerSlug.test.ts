import { Match } from "types";
import { findNearestPlayerSlug } from "functions";

describe("findNearestPlayerSlug", () => {
  it("finds player by slug (exact match)", () => {
    const matches = [
      {
        teams: [{ name: "Argentina" }, { name: "Uruguay" }],
        lineups: [[{ name: "Gabriel Batistuta" }], []],
      },
    ] as Pick<Match, "teams" | "lineups">[];

    expect(findNearestPlayerSlug(matches, "gabriel-batistuta")).toEqual(
      "gabriel-batistuta"
    );
  });

  it("finds player having same first and last name", () => {
    const matches = [
      {
        teams: [{ name: "Argentina" }, { name: "Uruguay" }],
        lineups: [[{ name: "Gabriel Batistuta" }], []],
      },
    ] as Pick<Match, "teams" | "lineups">[];

    expect(findNearestPlayerSlug(matches, "gabriel-omar-batistuta")).toEqual(
      "gabriel-batistuta"
    );
  });

  it("finds player having same last name and first letter of first name", () => {
    const matches = [
      {
        teams: [{ name: "Argentina" }, { name: "Uruguay" }],
        lineups: [[{ name: "Gabriel Batistuta" }], []],
      },
    ] as Pick<Match, "teams" | "lineups">[];

    expect(findNearestPlayerSlug(matches, "g-batistuta")).toEqual(
      "gabriel-batistuta"
    );
  });
});
