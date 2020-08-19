import * as React from "react";
import { render } from "@testing-library/react";

import { TagsContainer } from "./TagsContainer";

test("TagsContainer should render correctly with given props", () => {
  const tags = [{ name: "one" }, { name: "two" }];
  const selectedTag = "selected";
  const selectTag = (tag: string) => null;
  const retrieveTag = () => null;
  const retrieveRecipes = () => null;

  const { getAllByTestId } = render(
    <TagsContainer
      tags={tags}
      selectedTag={selectedTag}
      selectTag={selectTag}
      retrieveTags={retrieveTag}
      retrieveRecipes={retrieveRecipes}
    />
  );

  const tagsElem = getAllByTestId("tag");
  expect(tagsElem.length).toBe(2);
});
