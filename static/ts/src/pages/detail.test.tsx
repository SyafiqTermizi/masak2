import * as React from "react";
import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

import { Detail } from "./Detail";

test("Detail page should render correctly with given props", () => {
  const propsFunc = () => ({
    id: 1,
    name: "name",
    description: "description",
    rating: 1,
    difficulty: 1,
    created_by: "admin",
    medias: [
      {
        media_type: "IMG",
        media: "imageurl",
        recipe: 1,
        id: 1,
      },
    ],
    steps: [
      {
        id: 1,
        recipe: 1,
        step: "step",
      },
    ],
    groups: [
      {
        id: 1,
        name: "name",
        recipe: 1,
        ingredients: [
          {
            id: 1,
            group: 1,
            name: "name",
            unit: "unit",
            amount: "amount",
            note: "",
            isDone: false,
          },
        ],
      },
    ],
  });

  const { getByAltText, getByTestId } = render(
    <HashRouter>
      <Detail getRecipe={propsFunc} retrieveRecipe={(id) => id} />
    </HashRouter>
  );

  const image = getByAltText("name");
  expect(image.getAttribute("src")).toBe("imageurl");

  const title = getByTestId("title");
  expect(title.innerHTML).toBe("name");

  const descrption = getByTestId("description");
  expect(descrption.innerHTML).toBe("description");
});
