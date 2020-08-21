import * as React from "react";
import { render } from "@testing-library/react";

import { DetailHeader } from "./DetailHeader";

test("DetailHeader should render correctly given props", () => {
  window.user = {
    isAuthenticated: true,
    username: "test",
    userId: "1",
  };
  const props = {
    name: "name",
    difficulty: 1,
    created_by: "username",
    savedRecipes: [1, 2, 3],
    id: 1,
    description: "test",
    addSavedRecipe: () => null,
  };

  const { getByTestId } = render(<DetailHeader {...props} />);

  const title = getByTestId("title");
  expect(title.innerHTML).toBe("<b>name</b>");

  const description = getByTestId("description");
  expect(description.innerHTML).toBe("<b>test</b>");
});
