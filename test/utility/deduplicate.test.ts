import { deduplicate } from "utility";

describe("deduplicate", () => {
  it("addresses duplicate surnames", () => {
    const surnames = ["González", "González", "Martínez", "González"];

    expect(
      deduplicate(surnames, (index) => `${surnames[index]} ${index}`)
    ).toEqual(["González 0", "González 1", "Martínez", "González 3"]);
  });
});
