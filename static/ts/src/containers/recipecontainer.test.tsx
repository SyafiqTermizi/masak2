import * as React from "react";
import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

import { RecipeContainer } from "./RecipeContainer";

test("Recipe container should render correcty given props", () => {
  const recipes = {
    "1": {
      id: 1,
      name: "test",
      description: "test",
      rating: 1,
      difficulty: 1,
      created_by: "test user",
      groups: [],
      medias: [],
      steps: [],
    },
    "2": {
      id: 1,
      name: "test",
      description: "test",
      rating: 1,
      difficulty: 1,
      created_by: "test user",
      groups: [],
      medias: [],
      steps: [],
    },
  };
  const medias = {
    "1": {
      media_type: "IMG",
      media: "img.com",
      recipe: 1,
      id: 1,
    },
  };
  const retrieveRecipes = () => null;

  const { getAllByTestId } = render(
    <HashRouter>
      <RecipeContainer
        recipes={recipes}
        medias={medias}
        retrieveRecipes={retrieveRecipes}
      />
    </HashRouter>
  );
  const recipeElems = getAllByTestId("recipe");
  expect(recipeElems.length).toBe(2);
});
