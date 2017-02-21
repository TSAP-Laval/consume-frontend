import * as React from "react";
import { ActionMap } from "../components/Map/ArrowMap/Index"

import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";
import RaisedButton from 'material-ui/RaisedButton';

import Paper from 'material-ui/Paper';

import { Link } from 'react-router';

require('../sass/Home.scss');

export interface IHomeProps {}

export interface IHomeState {}

export default class Home extends React.Component<IHomeProps, IHomeState> {

    constructor() {
        super();
    }

    render() {
        return (
            <Paper className="main-content">
                <h1>Console TSAP</h1>
                <p>
                    <Link to="/team/3">
                        <RaisedButton primary={true} label="Statistiques de l'équipe" />
                    </Link>
                </p>
            </Paper>
        );
    }
}
