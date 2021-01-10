import { getPlayerCatalog } from "helpers";

describe("getPlayerCatalog", () => {
  it("gets first letter of the last name", () => {
    expect(getPlayerCatalog("Gabriel Batistuta")).toEqual("b");
    expect(getPlayerCatalog("Juan Pablo Sorín")).toEqual("s");
  });
});
