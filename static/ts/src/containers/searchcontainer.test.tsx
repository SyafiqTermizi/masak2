import * as React from "react";
import { render } from "@testing-library/react";

import { SearchContainer } from "./SearchContainer";

test("search-term should not exist if stateSearchTerm is empty", () => {
  const stateSearchTerm = "";
  const setStateSearchTerm = (searchTerm: string) => null;
  const clearSearchTerm = () => null;
  const retrieveRecipes = () => null;

  const { queryAllByTestId } = render(
    <SearchContainer
      stateSearchTerm={stateSearchTerm}
      setStateSearchTerm={setStateSearchTerm}
      clearSearchTerm={clearSearchTerm}
      retrieveRecipes={retrieveRecipes}
    />
  );

  const elems = queryAllByTestId("search-term");
  expect(elems.length).toBe(0);
});

test("search-term should exist if stateSearchTerm is not empty", () => {
  const stateSearchTerm = "exist";
  const setStateSearchTerm = (searchTerm: string) => null;
  const clearSearchTerm = () => null;
  const retrieveRecipes = () => null;

  const { queryAllByTestId } = render(
    <SearchContainer
      stateSearchTerm={stateSearchTerm}
      setStateSearchTerm={setStateSearchTerm}
      clearSearchTerm={clearSearchTerm}
      retrieveRecipes={retrieveRecipes}
    />
  );

  const elems = queryAllByTestId("search-term");
  expect(elems.length).toBe(1);
});
