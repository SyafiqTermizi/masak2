import * as React from "react";
import { Suspense } from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import { store } from "@syafiqtermizi/masak2-store";
import { HashRouter, Switch, Route } from "react-router-dom";

import { Recipes } from "./pages/Recipes";
import { Navbar } from "./components/Navbar";

const Detail = React.lazy(() => import("./pages/Detail"));
const RecipeForm = React.lazy(() => import("./pages/Form"));
const Footer = React.lazy(() => import("./components/Footer"));

const Elem = () => (
  <Provider store={store}>
    <HashRouter>
      <Navbar />
      <div className="container">
        <br />
        <Switch>
          <Route path="/create">
            <Suspense fallback={<div>loading..</div>}>
              <RecipeForm />
            </Suspense>
          </Route>
          <Route path="/detail/:id">
            <Suspense fallback={<div>loading..</div>}>
              <Detail />
            </Suspense>
          </Route>
          <Route path="/">
            <Recipes />
          </Route>
        </Switch>
      </div>
    </HashRouter>
    <Suspense fallback={<div>loading..</div>}>
      <br />
      <br />
      <br />
      <Footer />
    </Suspense>
  </Provider>
);

ReactDom.render(<Elem />, document.getElementById("root"));
