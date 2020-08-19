import * as React from "react";
import { render } from "@testing-library/react";

import { Tag } from "./Tag";

test("Tag component should render correctly with given props", () => {
  const func = () => null;
  const { getByTestId } = render(<Tag handleClick={func} tag="test" />);
  const tag = getByTestId("tag");
  expect(tag.innerHTML).toBe("test");
});
