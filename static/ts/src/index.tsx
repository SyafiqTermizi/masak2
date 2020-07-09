import * as React from "react";
import * as ReactDom from "react-dom";

import { Navbar } from "./components/navbar";

import "bootstrap/dist/css/bootstrap.min.css";

export const Hello: React.FC = () => (
  <div className="row">
    <div className="col-12">
      <h1>Hello World</h1>
    </div>
  </div>
);

const Elem = () => (
  <>
    <Navbar />
    <div className="container">
      <Hello />
    </div>
  </>
);

ReactDom.render(<Elem />, document.getElementById("root"));
