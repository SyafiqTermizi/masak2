import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { store } from "@syafiqtermizi/masak2-store";
import { HashRouter, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import RecipeForm from "./pages/Form";
import Detail from "./pages/Detail";
import { Recipes } from "./pages/Recipes";

const Elem = () => (
  <Provider store={store}>
    <HashRouter>
      <Navbar />
      <div className="container">
        <br />
        <Switch>
          <Route path="/create">
            <RecipeForm />
          </Route>
          <Route path="/detail/:id">
            <Detail />
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
