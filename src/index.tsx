import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import Layout from "./pages/Layout"
import Player from "./pages/Player"
import Home from "./pages/Home";
import TeamSettings from './pages/TeamSettings';
import MatchList from "./components/Team/Views/MatchList";
import PlayerList from "./components/Team/Views/PlayerList";

const root = document.getElementById("root");

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
      <Route path="team/:teamID/player/:playerID" component={Player}/>
      <Route path="team/:teamID/settings" component={TeamSettings}/>
        <Route path="test-matchlist/:team_id" component={MatchList}/>
        <Route path="test-playerlist/:team_id" component={PlayerList}/>
    </Route>
  </Router>,
root);
