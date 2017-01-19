import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, Link} from "react-router";

import Layout from "./pages/Layout"
import Player from "./pages/Player"
import Home from "./pages/Home";

const root = document.getElementById("root");

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="user" component={Player}></Route>
    </Route>
  </Router>, 
root);