import { matchSlug } from "helpers";

describe("matchSlug", () => {
  it("returns match slug", () => {
    expect(
      matchSlug({ teams: [{ name: "Argentina" }, { name: "Uruguay" }] })
    ).toEqual("argentina-uruguay");
  });

  it("returns match slug directly if present", () => {
    expect(
      matchSlug({
        teams: [{ name: "Argentina" }, { name: "Uruguay" }],
        slug: "argentina-uruguay-2",
      })
    ).toEqual("argentina-uruguay-2");
  });
});
