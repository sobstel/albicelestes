import { playerName } from "../../helpers";

describe("playerName", () => {
  it("handles a regular name", () => {
    expect(playerName("Javier Zanetti")).toEqual({
      firstName: "Javier",
      middleName: "",
      lastName: "Zanetti",
    });
  });

  it("handles a short name", () => {
    expect(playerName("M Blotto")).toEqual({
      firstName: "M",
      middleName: "",
      lastName: "Blotto",
    });

    expect(playerName("Domenech")).toEqual({
      firstName: "",
      middleName: "",
      lastName: "Domenech",
    });
  });

  it("handles a middle name", () => {
    expect(playerName("Alfredo C Brown")).toEqual({
      firstName: "Alfredo",
      middleName: "C",
      lastName: "Brown",
    });

    expect(playerName("Humberto Dionisio Maschio")).toEqual({
      firstName: "Humberto",
      middleName: "Dionisio",
      lastName: "Maschio",
    });
  });

  it("handles a last name with prefix", () => {
    expect(playerName("Ángel Di Maria")).toEqual({
      firstName: "Ángel",
      middleName: "",
      lastName: "Di Maria",
    });

    expect(playerName("Antonio Del Felice")).toEqual({
      firstName: "Antonio",
      middleName: "",
      lastName: "Del Felice",
    });

    expect(playerName("Alfredo Ciriaco de Vicenzi")).toEqual({
      firstName: "Alfredo",
      middleName: "Ciriaco",
      lastName: "de Vicenzi",
    });
  });
});
