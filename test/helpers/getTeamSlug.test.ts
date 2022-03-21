import { getTeamSlug } from "~/helpers";

describe("getTeamSlug", () => {
  it("converts name to slug", () => {
    expect(getTeamSlug({ name: "Northern Ireland" })).toEqual(
      "northern-ireland"
    );
  });

  it("returns team slug directly if present", () => {
    expect(getTeamSlug({ name: "USSR", slug: "russia" })).toEqual("russia");
  });
});
