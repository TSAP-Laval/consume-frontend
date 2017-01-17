import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import {App} from "./app/App";

const root = document.getElementById("root");

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={App}>
  </Route>
</Router>, root);