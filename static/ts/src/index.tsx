import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { store } from "@syafiqtermizi/masak2-store";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import Recipes from "./pages/Recipes";

import "bootstrap/dist/css/bootstrap.min.css";

const Elem = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/">
            <Recipes />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDom.render(<Elem />, document.getElementById("root"));
