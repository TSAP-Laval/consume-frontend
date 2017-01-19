import * as React from "react";
import { ArrowMap } from "../components/Map/ArrowMap/Index"

import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";

import { Link } from 'react-router';

import { Button, Jumbotron } from "react-bootstrap";

require('../sass/Home.scss');

export interface IHomeProps {}

export interface IHomeState {}

export default class Home extends React.Component<IHomeProps, IHomeState> {

    constructor() {
        super();
    }

    render() {
        return (
            <Jumbotron className="homeJumbotron">
                <h1>Console TSAP</h1>
                <p>
                    <Link to="/team/3">
                        <Button bsStyle="primary">Statistiques de l'équipe</Button>
                    </Link>
                </p>
            </Jumbotron>
        );
    }
}