import { getPlayerName } from "~/helpers";

describe("getPlayerName", () => {
  it("handles a regular name", () => {
    expect(getPlayerName("Javier Zanetti")).toEqual({
      firstName: "Javier",
      middleName: "",
      lastName: "Zanetti",
    });
  });

  it("handles a short name", () => {
    expect(getPlayerName("M Blotto")).toEqual({
      firstName: "M",
      middleName: "",
      lastName: "Blotto",
    });

    expect(getPlayerName("Domenech")).toEqual({
      firstName: "",
      middleName: "",
      lastName: "Domenech",
    });
  });

  it("handles a middle name", () => {
    expect(getPlayerName("Alfredo C Brown")).toEqual({
      firstName: "Alfredo",
      middleName: "C",
      lastName: "Brown",
    });

    expect(getPlayerName("Humberto Dionisio Maschio")).toEqual({
      firstName: "Humberto",
      middleName: "Dionisio",
      lastName: "Maschio",
    });
  });

  it("handles a last name with prefix", () => {
    expect(getPlayerName("Ángel Di Maria")).toEqual({
      firstName: "Ángel",
      middleName: "",
      lastName: "Di Maria",
    });

    expect(getPlayerName("Antonio Del Felice")).toEqual({
      firstName: "Antonio",
      middleName: "",
      lastName: "Del Felice",
    });

    expect(getPlayerName("Alfredo Ciriaco de Vicenzi")).toEqual({
      firstName: "Alfredo",
      middleName: "Ciriaco",
      lastName: "de Vicenzi",
    });
  });
});
