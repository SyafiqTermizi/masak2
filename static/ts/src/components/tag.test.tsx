import * as React from "react";
import { render } from "@testing-library/react";

import { Tag } from "./Tag";

test("Tag component should render correctly with given props", () => {
  const { getByTestId } = render(<Tag tag="test" />);
  const tag = getByTestId("tag");
  expect(tag.innerHTML).toBe("test");
});
