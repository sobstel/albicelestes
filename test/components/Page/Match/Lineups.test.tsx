import React from "react";
import { render } from "@testing-library/react";
import Lineups from "components/Match/Lineups";

type Props = Parameters<typeof Lineups>[0];

describe(Lineups, () => {
  describe("regular game", () => {
    const match: Props["match"] = {
      teams: [{ name: "Argentina" }, { name: "Uruguay" }],
      coaches: [{ name: "Marcelo Bielsa" }, null],
      lineups: [
        [
          { name: "Sergio Romero" },
          { name: "Roberto Ayala" },
          { name: "Juan Pablo Sorín" },
          { name: "Hernan Crespo", out: "70" },
          { name: "Gabriel Batistuta", in: "70" },
          { name: "Javier Saviola" },
        ],
        [
          { name: "Diego Godín" },
          { name: "Diego Forlán", out: "46" },
          { name: "Edinson Cavani", in: "46", out: "80" },
          { name: "Luis Suárez", in: "80" },
          { name: "Martín Cáceres" },
        ],
      ],
    };

    const { container } = render(<Lineups match={match} />);

    test("renders team headers", () => {
      const headers = container.querySelectorAll("h2");
      expect(headers[0].textContent).toEqual("Argentina (Marcelo Bielsa)");
      expect(headers[1].textContent).toEqual("Uruguay");
    });

    const lineupSections = container.querySelectorAll("section");

    test("renders home team lineup", () => {
      expect(lineupSections[0].textContent).toContain(
        "Sergio Romero, Roberto Ayala, Juan Pablo Sorín, Hernan Crespo (70' Gabriel Batistuta), Javier Saviola"
      );
    });

    test("renders away team lineup", () => {
      expect(lineupSections[1].textContent).toContain(
        "Diego Godín, Diego Forlán (46' Edinson Cavani) (80' Luis Suárez), Martín Cáceres"
      );
    });
  });
});
