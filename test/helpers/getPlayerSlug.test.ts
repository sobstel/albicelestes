import { getPlayerSlug } from "helpers";

describe("getPlayerSlug", () => {
  it("converts name to slug", () => {
    expect(getPlayerSlug("Gabriel Batistuta")).toEqual("gabriel-batistuta");
  });
});
