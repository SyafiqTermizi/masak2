import * as React from "react";
import { render } from "@testing-library/react";

import { TagsContainer } from "./TagsContainer";

test("TagsContainer should render correctly with given props", () => {
  const tags = [{ name: "one" }, { name: "two" }];
  const selectTag = (tag: string) => null;
  const retrieveTag = () => null;

  const { getAllByTestId } = render(
    <TagsContainer
      tags={tags}
      selectTag={selectTag}
      retrieveTags={retrieveTag}
    />
  );

  const tagsElem = getAllByTestId("tag");
  expect(tagsElem.length).toBe(2);
});
