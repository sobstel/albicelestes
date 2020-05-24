import { playerCatalog } from "helpers";

describe("playerCatalog", () => {
  it("gets first letter of the last name", () => {
    expect(playerCatalog("Gabriel Batistuta")).toEqual("b");
    expect(playerCatalog("Juan Pablo Sorín")).toEqual("s");
  });
});
