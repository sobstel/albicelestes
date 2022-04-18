import { getPlayerInitial } from "~/helpers";

describe("getPlayerInitial", () => {
  it("gets first letter of the last name", () => {
    expect(getPlayerInitial("Gabriel Batistuta")).toEqual("b");
    expect(getPlayerInitial("Juan Pablo Sorín")).toEqual("s");
  });
});
