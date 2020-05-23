import { playerSlug } from "helpers";

describe("playerSlug", () => {
  it("converts name to slug", () => {
    expect(playerSlug("Gabriel Batistuta")).toEqual("gabriel-batistuta");
  });
});
