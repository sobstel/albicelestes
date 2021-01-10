import { getMatchSlug } from "helpers";

describe("getMatchSlug", () => {
  it("returns match slug", () => {
    expect(
      getMatchSlug({ teams: [{ name: "Argentina" }, { name: "Uruguay" }] })
    ).toEqual("argentina-uruguay");
  });

  it("returns match slug directly if present", () => {
    expect(
      getMatchSlug({
        teams: [{ name: "Argentina" }, { name: "Uruguay" }],
        slug: "argentina-uruguay-2",
      })
    ).toEqual("argentina-uruguay-2");
  });
});
