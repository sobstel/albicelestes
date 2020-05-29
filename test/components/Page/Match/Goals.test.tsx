import React from "react";
import { render } from "@testing-library/react";
import Goals, { Props } from "components/Page/Match/Goals";

describe(Goals, () => {
  describe("regular game", () => {
    const match = {
      teams: [{ name: "Argentina" }, { name: "Uruguay" }],
      goals: [
        [
          { name: "Roberto Ayala", type: "G", min: "5" },
          { name: "Diego Godín", type: "OG", min: "90+2" },
          { name: "Juan Pablo Sorín", type: "G", min: "117" },
          { name: "Juan Pablo Sorín", type: "G", min: "119" },
        ],
        [
          { name: "Diego Forlán", type: "P", min: "25" },
          { name: "Diego Forlán", type: "G", min: "90+4" },
          { name: "Roberto Ayala", type: "OG", min: "91" },
        ],
      ],
      lineups: [
        [{ name: "Roberto Ayala" }, { name: "Juan Pablo Sorín" }],
        [{ name: "Diego Godín" }, { name: "Diego Forlán" }],
      ],
    } as Props["match"];

    const { container } = render(<Goals match={match} />);
    const ps = container.querySelectorAll("p");

    test("renders correctly", () => {
      expect(ps[0].textContent).toEqual("1:0 Ayala 5'");
      expect(ps[1].textContent).toEqual("1:1 Forlán 25' [P]");
      expect(ps[2].textContent).toEqual("2:1 Godín 90+2' [OG]");
      expect(ps[3].textContent).toEqual("2:2 Forlán 90+4'");
      expect(ps[4].textContent).toEqual("2:3 Ayala 91' [OG]");
      expect(ps[5].textContent).toEqual("3:3 Sorín 117'");
      expect(ps[6].textContent).toEqual("4:3 Sorín 119'");
    });

    test("links my players", () => {
      expect(ps[0].querySelector("a")?.toString()).toContain("roberto-ayala");
      expect(ps[1].querySelector("a")?.toString()).toBeUndefined();
      expect(ps[2].querySelector("a")?.toString()).toBeUndefined();
      expect(ps[3].querySelector("a")?.toString()).toBeUndefined();
      expect(ps[4].querySelector("a")?.toString()).toContain("roberto-ayala");
      expect(ps[5].querySelector("a")?.toString()).toContain(
        "juan-pablo-sorin"
      );
      expect(ps[6].querySelector("a")?.toString()).toContain(
        "juan-pablo-sorin"
      );
    });
  });

  describe("game with incomplete data", () => {
    const match = {
      teams: [{ name: "Argentina" }, { name: "Uruguay" }],
      goals: [
        [
          { name: "Roberto Ayala", type: "G", min: "45" },
          { name: "Javier Zanetti", type: "G" },
        ],
        [{ name: "Diego Godín", type: "G" }],
      ],
      lineups: [
        [{ name: "Roberto Ayala" }, { name: "Javier Zanetti" }],
        [{ name: "Diego Godín" }],
      ],
    } as Props["match"];

    const { container } = render(<Goals match={match} />);
    const ps = container.querySelectorAll("p");

    test("renders correctly", () => {
      expect(ps[0].textContent).toEqual("ARG: Ayala, Zanetti");
      expect(ps[1].textContent).toEqual("URU: Godín");
    });
  });
});
