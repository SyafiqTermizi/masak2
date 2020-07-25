import React from "react";
import { HashRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

import { Navbar } from "./Navbar";

describe("Navbar link for unauthenticated user should have the correct content", () => {
  beforeEach(() => {
    window.user = {
      isAuthenticated: false,
      username: "test",
    };
  });

  it("should contain link to Home", () => {
    const { getByText } = render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );
    const elem = getByText("Home");
    expect(elem.innerHTML).toBe("Home");
  });

  it("should contain link to Login page", () => {
    const { getByText } = render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );
    const elem = getByText("Login");
    expect(elem.innerHTML).toBe("Login");
  });
});

describe("Navbar links for authenticated user should have the correct content", () => {
  beforeEach(() => {
    window.user = {
      isAuthenticated: true,
      username: "test",
    };
  });

  it("should contain link to Home", () => {
    const { getByText } = render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );
    const elem = getByText("Home");
    expect(elem.innerHTML).toBe("Home");
  });

  it("should contain link to Create page", () => {
    const { getByText } = render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );
    const elem = getByText("Create");
    expect(elem.innerHTML).toBe("Create");
  });

  it("should contain link to Logout page", () => {
    const { getByText } = render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );
    const elem = getByText("Logout");
    expect(elem.innerHTML).toBe("Logout");
  });
});
