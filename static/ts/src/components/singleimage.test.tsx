import * as React from "react";
import { render } from "@testing-library/react";

import { SingleImage } from "./SingleImage";

test("SingleImage should render correctly given props", () => {
  const props = {
    mediaUrl: "image.com",
    altName: "image",
    width: "100",
    height: "100",
  };

  const { getByTestId } = render(<SingleImage {...props} />);
  const elem = getByTestId("single-image");

  expect(elem.getAttribute("src")).toBe(props.mediaUrl);
  expect(elem.getAttribute("alt")).toBe(props.altName);
  expect(elem.getAttribute("width")).toBe(props.width);
  expect(elem.getAttribute("height")).toBe(props.height);
});
