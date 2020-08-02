import * as React from "react";
import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

import { Recipes } from "./Recipes";

test("Recipes component should render correctly with given props", () => {
  const props = {
    recipes: {
      "1": {
        id: 1,
        name: "recipe name",
        description: "description",
        rating: 1,
        difficulty: 1,
        created_by: "user",
        groups: [],
        medias: [],
        steps: [],
      },
      "2": {
        id: 2,
        name: "recipe name 2",
        description: "description 2",
        rating: 2,
        difficulty: 2,
        created_by: "user",
        groups: [],
        medias: [],
        steps: [],
      },
    },
    medias: {
      "1": {
        media_type: "IMG",
        media: "'mediaurl'",
        recipe: 1,
        id: 1,
      },
      "2": {
        media_type: "IMG",
        media: "'mediaurl'",
        recipe: 2,
        id: 2,
      },
    },
    retrieveRecipes: () => null,
    searchRecipe: () => null,
  };
  const { getAllByRole } = render(
    <HashRouter>
      <Recipes {...props} />
    </HashRouter>
  );

  const links = getAllByRole("link");
  expect(links.length).toBe(2);
});
