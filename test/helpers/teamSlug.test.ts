import { teamSlug } from "helpers";

describe("teamSlug", () => {
  it("converts name to slug", () => {
    expect(teamSlug({ name: "Northern Ireland" })).toEqual("northern-ireland");
  });

  it("returns team slug directly if present", () => {
    expect(teamSlug({ name: "USSR", slug: "russia" })).toEqual("russia");
  });
});
