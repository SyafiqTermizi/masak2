import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithubAlt, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => (
  <footer
    className="footer navbar"
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
          <a className="mr-2 mt-5" href="https://github.com/syafiqtermizi">
            <FontAwesomeIcon icon={faGithubAlt} />
          </a>
          <a href="https://www.linkedin.com/in/ahmad-syafiq-748291155/">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
