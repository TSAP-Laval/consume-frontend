import * as React from "react";
import { ActionMap } from "../components/Map/ActionMap/Index"

import StatsTable from "../components/PlayerStats/StatsTable";
import StatsGraphs from "../components/PlayerStats/StatsGraphs";
import RaisedButton from 'material-ui/RaisedButton';

import { Link } from 'react-router';

import BigContent from "../components/Elements/BigContent";
import Li from "../components/Elements/Li";


export interface IHomeProps {}

export interface IHomeState {}

export default class Home extends React.Component<IHomeProps, IHomeState> {

    constructor() {
        super();
    }

    render() {
        return (
            <BigContent>
                <h1>Console TSAP</h1>
                <ul>
                    <Li><Link to="/team/3"><RaisedButton primary={true} label="Statistiques de l'équipe" /></Link></Li>
                    <Li><Link to="/team/3/matches"><RaisedButton primary={true} label="Matchs de l'équipe" /></Link></Li>
                </ul>
            </BigContent>
        );
    }
}
