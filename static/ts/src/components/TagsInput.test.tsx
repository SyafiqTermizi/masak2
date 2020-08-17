import * as React from "react";
import { render } from "@testing-library/react";

import { Tag } from "@syafiqtermizi/masak2-store/lib/tags";

import { TagsInput } from "./TagsInput";

test("TagsInput should render correctly", () => {
  let tags: Tag[] = [];
  const setTags = (params: Tag[]) => {
    tags = [...tags, ...params];
  };
  const { findByPlaceholderText } = render(
    <TagsInput tags={tags} setTags={setTags} />
  );
  const elem = findByPlaceholderText("Add a tag (press enter when done)");
  expect(elem).toBeTruthy();
});
