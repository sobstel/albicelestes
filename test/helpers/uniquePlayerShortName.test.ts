import { uniquePlayerShortName } from "helpers";

describe("uniquePlayerShortName", () => {
  const names = [
    "Lautaro Martínez",
    "Lisandro Martínez",
    "Lucas Martínez",
    "Javier Mascherano",
    "Juan Pablo Sorin",
    "Juan Sebastian Veron",
    "Diego Simeone",
    "Giovanni Simeone",
    "Maxi Rodriguez",
  ];

  it("returns last name for regular name", () => {
    expect(uniquePlayerShortName("Javier Mascherano", names)).toEqual(
      "Mascherano"
    );
  });

  it("returns last name for multi-part name", () => {
    expect(uniquePlayerShortName("Juan Pablo Sorin", names)).toEqual("Sorin");
    expect(uniquePlayerShortName("Juan Sebastian Veron", names)).toEqual(
      "Veron"
    );
  });

  it("returns inflected name if name defined in db inflections", () => {
    expect(uniquePlayerShortName("Lautaro Martínez", names)).toEqual(
      "Lautaro Martínez"
    );
    expect(uniquePlayerShortName("Maxi Rodriguez", names)).toEqual(
      "Maxi Rodriguez"
    );
  });

  it("returns shortened first name and full last name non-unique names", () => {
    expect(uniquePlayerShortName("Diego Simeone", names)).toEqual("D. Simeone");
    expect(uniquePlayerShortName("Giovanni Simeone", names)).toEqual(
      "G. Simeone"
    );
  });

  it("returns full name if non-unique names have same first char of first name", () => {
    expect(uniquePlayerShortName("Lisandro Martínez", names)).toEqual(
      "Lisandro Martínez"
    );
    expect(uniquePlayerShortName("Lucas Martínez", names)).toEqual(
      "Lucas Martínez"
    );
  });

  it("returns passed full name if no matching name", () => {
    expect(uniquePlayerShortName("Gustavo Cerati", names)).toEqual(
      "Gustavo Cerati"
    );
  });
});
