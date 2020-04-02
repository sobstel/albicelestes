import { playersShortNames } from "../../helpers";

describe("playersShortNames", () => {
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

  const shortNames = playersShortNames(names);

  it("returns last name for regular name", () => {
    expect(shortNames["Javier Mascherano"]).toEqual("Mascherano");
  });

  it("returns last name for multi-part name", () => {
    expect(shortNames["Juan Pablo Sorin"]).toEqual("Sorin");
    expect(shortNames["Juan Sebastian Veron"]).toEqual("Veron");
  });

  it("returns inflected name if name defined in db inflections", () => {
    expect(shortNames["Lautaro Martínez"]).toEqual("Lautaro Martínez");
    expect(shortNames["Maxi Rodriguez"]).toEqual("Maxi Rodriguez");
  });

  it("returns shortened first name and full last name non-unique names", () => {
    expect(shortNames["Diego Simeone"]).toEqual("D. Simeone");
    expect(shortNames["Giovanni Simeone"]).toEqual("G. Simeone");
  });

  it("returns full name if non-unique names have same first char of first name", () => {
    expect(shortNames["Lisandro Martínez"]).toEqual("Lisandro Martínez");
    expect(shortNames["Lucas Martínez"]).toEqual("Lucas Martínez");
  });
});
