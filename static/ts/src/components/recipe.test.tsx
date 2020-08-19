import * as React from "react";
import { HashRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { Recipe } from "./Recipe";

test("test Recipe component should render correctly with given props", () => {
  const props = {
    id: 1,
    name: "name",
    description: "lorem ipsum",
    difficulty: 1,
    medias: [
      {
        media_type: "IMG",
        media: "test",
        recipe: 1,
        id: 1,
      },
    ],
  };

  const { getByRole, getByAltText, getByTestId } = render(
    <HashRouter>
      <Recipe {...props} />
    </HashRouter>
  );

  const link = getByRole("link");
  expect(link.getAttribute("href")).toBe("#/detail/1");

  const image = getByAltText("name");
  expect(image.getAttribute("src")).toBe("test");

  const title = getByTestId("title");
  expect(title.innerHTML).toBe("<b>name</b>");

  const description = getByTestId("description");
  expect(description.innerHTML).toBe("lorem ipsum...");
});
