import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { store } from "@syafiqtermizi/masak2-store";
import { HashRouter, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Form } from "./pages/Form";
import Recipes from "./pages/Recipes";

import "bootstrap/dist/css/bootstrap.min.css";

const Elem = () => (
  <Provider store={store}>
    <HashRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/create">
            <Form />
          </Route>
          <Route path="/">
            <Recipes />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  </Provider>
);

ReactDom.render(<Elem />, document.getElementById("root"));
