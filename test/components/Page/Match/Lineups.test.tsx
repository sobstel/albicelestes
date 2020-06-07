import React from "react";
import { render } from "@testing-library/react";
import Lineups from "components/Page/Match/Lineups";

type Props = Parameters<typeof Lineups>[0];

describe(Lineups, () => {
  describe("regular game", () => {
    const match = {
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
    } as Props["match"];

    const { container } = render(<Lineups match={match} />);

    test("renders team headers", () => {
      const headers = container.querySelectorAll("h2");
      expect(headers[0].textContent).toEqual("Argentina (Marcelo Bielsa)");
      expect(headers[1].textContent).toEqual("Uruguay (unknown)");
    });

    const lineupDivs = container.querySelectorAll("div h2 + div");

    test("renders home team lineup", () => {
      expect(lineupDivs[0].textContent).toEqual(
        "Romero, Ayala, Sorín, Crespo (70' Batistuta), Saviola"
      );
    });

    test("renders away team lineup", () => {
      expect(lineupDivs[1].textContent).toEqual(
        "Godín, Forlán (46' Cavani) (80' Suárez), Cáceres"
      );
    });
  });
});
