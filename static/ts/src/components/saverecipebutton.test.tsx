import * as React from "react";
import { render } from "@testing-library/react";
import { SaveRecipeButton } from "./SaveRecipeButton";

test("SaveRecipeButton should have btn-custom-danger className because savedRecipe contains recipeID", () => {
  window.user = {
    userId: "1",
    username: "test",
    isAuthenticated: true,
  };
  const props = {
    savedRecipes: [1, 2],
    recipeId: 1,
    addSavedRecipe: () => null,
  };

  const { getByTestId } = render(<SaveRecipeButton {...props} />);
  const elem = getByTestId("save-button");

  expect(elem.className).toContain("btn-custom-danger");
});

test("SaveRecipeButton should have btn-light className because savedRecipe dont contains recipeID", () => {
  window.user = {
    userId: "1",
    username: "test",
    isAuthenticated: true,
  };
  const props = {
    savedRecipes: [1, 2],
    recipeId: 3,
    addSavedRecipe: () => null,
  };

  const { getByTestId } = render(<SaveRecipeButton {...props} />);
  const elem = getByTestId("save-button");

  expect(elem.className).toContain("btn-light");
});