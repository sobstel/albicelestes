import { getMatchItem } from "helpers";
import { Match, MatchItem } from "types";

describe("getMatchItem", () => {
  const match = {
    date: "2019-11-18",
    competition: "Friendly",
    venue: { name: "Bloomfield Stadium, Tel Aviv" },
    teams: [{ name: "Argentina" }, { name: "Uruguay" }],
    score: [2, 2],
    result: "D",
    goals: [
      [
        { name: "Sergio Agüero", min: "63", type: "G" },
        { name: "Lionel Messi", min: "90+2", type: "P" },
      ],
      [
        { name: "Edinson Cavani", min: "34", type: "G" },
        { name: "Luis Suárez", min: "68", type: "G" },
      ],
    ],
    cards: [
      [
        { name: "Leandro Paredes", min: "40", type: "Y" },
        { name: "Nicolás González", min: "90+4", type: "Y" },
      ],
      [
        { name: "Edinson Cavani", min: "39", type: "Y" },
        { name: "Mathías Vecino", min: "43", type: "Y" },
        { name: "Diego Godín", min: "53", type: "Y" },
      ],
    ],
    coaches: [{ name: "Lionel Scaloni" }, { name: "Óscar Tabárez" }],
    lineups: [
      [
        { name: "Esteban Andrada" },
        { name: "Nicolás Otamendi" },
        { name: "Nicolás Tagliafico" },
        { name: "Germán Pezzella" },
        { name: "Renzo Saravia" },
        { name: "Marcos Acuña", out: "68" },
        { name: "Nicolás Domínguez", in: "68" },
        { name: "Rodrigo De Paul", out: "88" },
        { name: "Guido Rodríguez", in: "88" },
        { name: "Leandro Paredes", out: "79" },
        { name: "Nicolás González", in: "79" },
        { name: "Lionel Messi" },
        { name: "Sergio Agüero" },
        { name: "Paulo Dybala", out: "76" },
        { name: "Lautaro Martínez", in: "76" },
      ],
      [
        { name: "Martín Campaña" },
        { name: "Martín Cáceres" },
        { name: "Sebastián Coates", out: "17" },
        { name: "Giovanni González", in: "17" },
        { name: "Diego Godín" },
        { name: "Matías Viña" },
        { name: "Brian Lozano", out: "88" },
        { name: "Brian Rodríguez", in: "88" },
        { name: "Lucas Torreira" },
        { name: "Federico Valverde", out: "75" },
        { name: "Rodrigo Bentancur", in: "75" },
        { name: "Mathías Vecino" },
        { name: "Edinson Cavani", out: "56" },
        { name: "Diego Laxalt", in: "56" },
        { name: "Luis Suárez" },
      ],
    ],
    sources: ["El Gráfico"],
  } as Match;

  const expectedMatch = {
    date: "2019-11-18",
    competition: "Friendly",
    teams: [{ name: "Argentina" }, { name: "Uruguay" }],
    score: [2, 2],
    result: "D",
    sources: ["El Gráfico"],
  } as MatchItem;

  it("extracts match item", () => {
    expect(getMatchItem(match)).toEqual(expectedMatch);
  });

  it("includes slug if present", () => {
    match.slug = "argentina-uruguay-2";
    expectedMatch.slug = match.slug;

    expect(getMatchItem(match)).toEqual(expectedMatch);
  });

  it("includes pen if present", () => {
    match.pen = [5, 4];
    expectedMatch.pen = match.pen;

    expect(getMatchItem(match)).toEqual(expectedMatch);
  });
});
