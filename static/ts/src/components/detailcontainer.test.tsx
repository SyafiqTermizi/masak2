import * as React from "react";
import { render } from "@testing-library/react";

import { DetailContainer } from "./DetailContainer";

test("DetailContainer should render correctly with given props", () => {
  const props = {
    marginTopClass: "top",
    extraClass: "extra",
  };
  const Child = () => <h1>Hello World</h1>;

  const { getByTestId } = render(
    <DetailContainer {...props}>
      <Child />
    </DetailContainer>
  );
  const elem = getByTestId("detail-container");
  expect(elem.className).toContain("top");
  expect(elem.className).toContain("extra");
  expect(elem.innerHTML).toContain("<h1>Hello World</h1>");
});
