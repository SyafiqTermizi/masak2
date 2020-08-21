import * as React from "react";
import { render } from "@testing-library/react";

import { GroupsIngredients } from "./GroupsIngredients";

test("GroupsIngredients should render correctly with given props", () => {
  const groups = [
    {
      id: 1,
      name: "",
      recipe: 1,
      ingredients: [
        {
          id: 1,
          group: 1,
          name: "test",
          unit: "test",
          amount: "test",
          note: "test",
          isDone: false,
        },
        {
          id: 2,
          group: 1,
          name: "test",
          unit: "test",
          amount: "test",
          note: "test",
          isDone: true,
        },
      ],
    },
  ];
  const { queryAllByTestId } = render(
    <GroupsIngredients groups={groups} toggleIngredient={(id) => null} />
  );
  const elemList = queryAllByTestId("ingredient");

  // should be 2 because we passed to ingredients
  expect(elemList.length).toBe(2);

  // if ingredient isDone === true it should have classname of ingredient-done
  expect(elemList[0].className).toBe("");
  expect(elemList[1].className).toBe("ingredient-done");
});
