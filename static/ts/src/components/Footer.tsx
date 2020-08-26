import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => (
  <footer
    className="footer"
    style={{
      backgroundColor: "lightgray",
      height: "35px",
      paddingTop: "8px",
    }}
  >
    <div className="container">
      <div className="row text-muted">
        <div className="col-8">
          Made with <FontAwesomeIcon icon={faHeart} /> by Syafiq Termizi
        </div>
        <div className="col-4 text-right">
          <a href="https://github.com/syafiqtermizi">Github</a>
        </div>
      </div>
    </div>
  </footer>
);
