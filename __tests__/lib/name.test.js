import { playerName } from "../../lib/name";

describe("playerName", () => {
  it("standard", () => {
    expect(playerName("Javier Zanetti")).toEqual({
      firstName: "Javier",
      middleName: "",
      lastName: "Zanetti"
    });
  });

  it("shorter name", () => {
    expect(playerName("M Blotto")).toEqual({
      firstName: "M",
      middleName: "",
      lastName: "Blotto"
    });

    expect(playerName("Domenech")).toEqual({
      firstName: "",
      middleName: "",
      lastName: "Domenech"
    });
  });

  it("with middle name", () => {
    expect(playerName("Alfredo C Brown")).toEqual({
      firstName: "Alfredo",
      middleName: "C",
      lastName: "Brown"
    });

    expect(playerName("Humberto Dionisio Maschio")).toEqual({
      firstName: "Humberto",
      middleName: "Dionisio",
      lastName: "Maschio"
    });
  });

  it("last name with suffix", () => {
    expect(playerName("Ángel Di Maria")).toEqual({
      firstName: "Ángel",
      middleName: "",
      lastName: "Di Maria"
    });

    expect(playerName("Antonio Del Felice")).toEqual({
      firstName: "Antonio",
      middleName: "",
      lastName: "Del Felice"
    });

    expect(playerName("Alfredo Ciriaco de Vicenzi")).toEqual({
      firstName: "Alfredo",
      middleName: "Ciriaco",
      lastName: "de Vicenzi"
    });
  });
});
