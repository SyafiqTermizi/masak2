import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => (
  <nav className="navbar navbar-active navbar-expand-lg navbar-light bg-white fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <FontAwesomeIcon
          style={{ marginTop: "10px" }}
          icon={faHamburger}
          size="lg"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/create">
              Create
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
