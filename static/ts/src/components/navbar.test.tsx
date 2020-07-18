import React from "react";
import { HashRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

import { Navbar } from "./Navbar";

test("click Home should navigate to /", () => {
  const { getByText } = render(
    <HashRouter>
      <Navbar />
    </HashRouter>
  );
  const elem = getByText("Home");
  expect(elem.innerHTML).toBe("Home");
  expect(elem.classList).toContain("active");
});

test("click Create should navigate to /create", () => {
  const { getByText } = render(
    <HashRouter>
      <Navbar />
    </HashRouter>
  );
  const elem = getByText("Create");
  expect(elem.innerHTML).toBe("Create");

  fireEvent.click(elem);
  expect(elem.classList).toContain("active");
});
