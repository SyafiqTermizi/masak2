import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { store } from "@syafiqtermizi/masak2-store";

import { Navbar } from "./components/Navbar";
import Recipes from "./pages/Recipes";
import "bootstrap/dist/css/bootstrap.min.css";

const Elem = () => (
  <Provider store={store}>
    <Navbar />
    <div className="container">
      <Recipes />
    </div>
  </Provider>
);

ReactDom.render(<Elem />, document.getElementById("root"));
