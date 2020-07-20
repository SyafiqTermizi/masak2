import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/home">
        <FontAwesomeIcon icon={faHamburger} size="lg" />
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
        <ul className="navbar-nav mr-auto"></ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link btn btn-light" to="/home">
              <b>Home</b>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link btn btn-light"
              to="/create"
            >
              <b>Create</b>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
