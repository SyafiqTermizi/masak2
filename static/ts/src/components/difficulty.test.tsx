import * as React from "react";
import { render } from "@testing-library/react";

import { Difficulty } from "./Difficulty";

test("Difficulty component should render correctly with given props", () => {
  const { getByTestId } = render(<Difficulty difficultyNumber={1} />);
  const elem = getByTestId("difficulty");

  expect(elem.className).toContain("badge rounded-pill");
  expect(elem.innerHTML).toBe("Easy");
});
