import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, Link} from "react-router";

import Layout from "./pages/Layout"
import Player from "./pages/Player"
import Home from "./pages/Home";
import Team from "./pages/Team";
import MatchList from "./components/Matches/Views/MatchList";
import MatchDetails from "./components/Matches/Views/MatchDetails";
import TeamSettings from './pages/TeamSettings';

const root = document.getElementById("root");

// Note: Les paramètres de l'équipe sont uniques à une paire Coach-Team.
// On spécifie seulement l'ID de l'équipe dans l'URL, et on récupèrera l'ID du Coach
// à partir du JWT lorsqu'on aura l'authentification.
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="team/:teamID" component={Team}></Route>
      <Route path="team/:teamID/player/:playerID" component={Player}></Route>
      <Route path="team/:teamID/matches" component={MatchList}></Route>
      <Route path="team/:teamID/matches/matchID" component={MatchDetails}></Route>
      <Route path="team/:teamID/settings" component={TeamSettings}></Route>
    </Route>
  </Router>,
root);
