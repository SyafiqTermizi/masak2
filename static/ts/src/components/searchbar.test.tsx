import * as React from "react";
import { render } from "@testing-library/react";

import { SearchBar } from "./Searchbar";

test("SearchBar input should have the value 'search term'", () => {
  const props = {
    stateSearchTerm: "",
    localSearchTerm: "search term",
    setSearchTerm: (param: string) => null,
    handleSearch: () => null,
    clearSearchTerm: () => null,
  };

  const { getByPlaceholderText } = render(<SearchBar {...props} />);
  const input = getByPlaceholderText(
    "Search Recipes or ingredients"
  ) as HTMLInputElement;

  expect(input.value).toBe("search term");
});

test("SearchBar button should change to 'clear filter' when stateSearchTerm have value", () => {
  const stateSearchTerm = "values";
  let searchTerm = "";
  const handleSearch = () => null;
  const setSearchTerm = (term: string) => null;
  const clearSearchTerm = () => null;

  const { getByTestId } = render(
    <SearchBar
      stateSearchTerm={stateSearchTerm}
      handleSearch={() => handleSearch()}
      setSearchTerm={setSearchTerm}
      localSearchTerm={searchTerm}
      clearSearchTerm={() => clearSearchTerm()}
    />
  );
  const button = getByTestId("search-button");
  expect(button.innerHTML).toContain("<b>Clear filter</b>");
});
