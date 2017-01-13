import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import {Index} from "./layouts/Index/index";

const root = document.getElementById("root");

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={Index}>
  </Route>
</Router>, root);