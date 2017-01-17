import * as React from "react";
import * as ReactDOM from "react-dom";

import {Router, Route, IndexRoute, hashHistory} from "react-router";

import { Layout } from "./layouts/Layout"
import { Header } from "./app/Header" 

ReactDOM.render(
  <Layout/>,
  document.getElementById('root')
);