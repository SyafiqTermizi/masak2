import * as React from "react";
import { render } from "@testing-library/react";

import { Steps } from "./Steps";

test("steps should render correctly with given props", () => {
  const steps = [
    {
      id: 1,
      recipe: 1,
      step: "test",
    },
    {
      id: 2,
      recipe: 1,
      step: "2nd test",
    },
  ];
  const { queryAllByTestId } = render(<Steps steps={steps} />);
  const elemList = queryAllByTestId("step");

  expect(elemList.length).toBe(2);
  expect(elemList[0].innerHTML).toBe("test");
  expect(elemList[1].innerHTML).toBe("2nd test");
});
