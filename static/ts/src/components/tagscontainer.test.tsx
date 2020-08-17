import * as React from "react";
import { render } from "@testing-library/react";

import { TagsContainer } from "./TagsContainer";

test("TagsContainer should render correctly with given props", () => {
  const tags = [{ name: "one" }, { name: "two" }];
  const { getAllByTestId } = render(<TagsContainer tags={tags} />);

  const tagsElem = getAllByTestId("tag");
  expect(tagsElem.length).toBe(2);
});
