import * as React from "react";
import { render } from "@testing-library/react";

import { Tag } from "./Tag";

test("Tag component should render with black button", () => {
  const tag = "some tag";
  const selectedTag = "some tag";
  const func = () => null;

  const { getByTestId } = render(
    <Tag tag={tag} selectedTag={selectedTag} setTag={func} />
  );
  const tagElem = getByTestId("tag");

  expect(tagElem.innerHTML).toBe("some tag");
  expect(tagElem.className).toBe("tags-item mx-2 mt-2 btn btn-dark btn-sm");
});

test("Tag component should render with black outline button", () => {
  const tag = "some tag";
  const selectedTag = "different tag";
  const func = () => null;

  const { getByTestId } = render(
    <Tag tag={tag} selectedTag={selectedTag} setTag={func} />
  );
  const tagElem = getByTestId("tag");

  expect(tagElem.innerHTML).toBe("some tag");
  expect(tagElem.className).toBe(
    "tags-item mx-2 mt-2 btn btn-outline-dark btn-sm"
  );
});
