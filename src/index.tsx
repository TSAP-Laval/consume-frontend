import * as React from "react";
import * as ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import Layout from "./pages/Layout"
import Player from "./pages/Player"
import Home from "./pages/Home";
import Match from "./pages/Match"
import TeamSettings from './pages/TeamSettings';

import Users from './pages/Users';
import MatchList from "./components/Team/Views/MatchList";
import PlayerList from "./components/Team/Views/PlayerList";
import Login from "./pages/Login";
import IsAuthenticated from "./pages/IsAuthenticated";
import IsAdmin from "./pages/IsAdmin";
import IsNotAuthenticated from "./pages/IsNotAuthenticated";


const root = document.getElementById("root");

ReactDOM.render(

    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Login}/>
            
            <Route component={IsNotAuthenticated}>
                <Route path="login" component={Login}/>
             </Route>

            <Route component={IsAdmin}>
                <Route path="users" component={Users} />
            </Route>

            <Route component={IsAuthenticated} >
                <Route path="team" component={Home} />
                <Route path="team/:teamID/settings" component={TeamSettings}/>
                <Route path="team/:team_id/matches/:match_id" component={Match}/>
                <Route path="team/:team_id/matches" component={MatchList}/>
                <Route path="team/:team_id/players" component={PlayerList}/>
                <Route path="team/:teamID/players/:playerID" component={Player}/>
            </Route>

        </Route>
    </Router>,
root);