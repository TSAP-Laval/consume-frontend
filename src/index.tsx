import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, Link} from "react-router";

import Layout from "./pages/Layout"
import Player from "./pages/Player"
import Home from "./pages/Home";
import Team from "./pages/Team";

const root = document.getElementById("root");

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="team/:teamID" component={Team}></Route>
      <Route path="team/:teamID/player/:playerID" component={Player}></Route>
    </Route>
  </Router>, 
root);