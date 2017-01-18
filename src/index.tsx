import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, Link} from "react-router";

import { Layout } from "./pages/Layout"
import { User } from "./pages/User"

const root = document.getElementById("root");

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <Route path="user" component={User}></Route>
    </Route>
  </Router>, 
root);