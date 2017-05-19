import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import Layout from "./pages/Layout"
import Player from "./pages/Player"
import Home from "./pages/Home";
import TeamSettings from './pages/TeamSettings';

const root = document.getElementById("root");

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="team/:teamID/player/:playerID" component={Player}></Route>
      <Route path="team/:teamID/settings" component={TeamSettings}></Route>
    </Route>
  </Router>,
root);
