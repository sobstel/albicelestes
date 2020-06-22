import React from "react";
import { render } from "@testing-library/react";
import PenaltyShootout from "components/Page/Match/PenaltyShootout";

type Props = Parameters<typeof PenaltyShootout>[0];

describe(PenaltyShootout, () => {
  describe("regular game", () => {
    const matchInfo = {
      penaltyShootout: [
        { name: "Ron Vlaar", score: "x" },
        { name: "Lionel Messi", score: [1, 0] },
        { name: "Arjen Robben", score: [1, 1] },
        { name: "Ezequiel Garay", score: [2, 1] },
        { name: "Wesley Sneijder", score: "x" },
        { name: "Sergio Agüero", score: [3, 1] },
        { name: "Dirk Kuyt", score: [3, 2] },
        { name: "Maxi Rodriguez", score: [4, 2] },
      ],
    } as Props["matchInfo"];

    const { container } = render(<PenaltyShootout matchInfo={matchInfo} />);

    test("renders correctly", () => {
      expect(container.textContent).toEqual(
        "Vlaar (x), Messi (1:0), Robben (1:1), Garay (2:1), Sneijder (x), Agüero (3:1), Kuyt (3:2), Maxi Rodriguez (4:2)"
      );
    });
  });
});
