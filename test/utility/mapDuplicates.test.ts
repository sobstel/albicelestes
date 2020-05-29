import { mapDuplicates } from "utility";

describe("mapDuplicates", () => {
  it("addresses duplicate surnames", () => {
    const surnames = ["González", "González", "Martínez", "González"];

    expect(
      mapDuplicates(surnames, (name, index) => `${name} ${index}`)
    ).toEqual(["González 0", "González 1", "Martínez", "González 3"]);
  });
});
