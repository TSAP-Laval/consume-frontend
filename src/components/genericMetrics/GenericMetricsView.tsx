import * as React from "react";
import genericMetricsStore from "../genericMetrics/GenericMetricsStore";
import MetricsTable from "../genericMetrics/MetricsTable";
import IJoueur from "./models/IJoueur";
import Status from "./models/Status";
import { ProgressBar } from 'react-bootstrap';
import { CreateGetPlayersAction } from "./actions/genericMetricsActions";

//require('../../sass/Layout.scss');

// Represent the props reveived by the Component GenericMetrics.
export interface IDataProps {}

export interface IDataStates {
     requestState?: Status,
    joueurs?: IJoueur[]
}

//This component will display all metrics from a team.
export default class GenericMetricsView extends React.Component<IDataProps, IDataStates> {

    constructor() {
        super();

         this.getStatus = this.getStatus.bind(this);
        this.getResults = this.getResults.bind(this);

        this.state = {
            requestState: genericMetricsStore.getRequestStatus(),
            joueurs: genericMetricsStore.getAllPlayers()
        }
    }

    // Will fetch and load the data.
    componentWillMunt(){
        genericMetricsStore.on("dataChange", this.getResults);
        genericMetricsStore.on("requestState", this.getStatus);
        CreateGetPlayersAction(1);
    }

    // Pour la gestion de mémoire on supprime les listener d'events.
    componentWillUnmunt(){
        genericMetricsStore.removeListener("dataChange", this.getResults);
        genericMetricsStore.removeListener("requestState", this.getStatus);
    }

    // Va récupérer les joueurs du store.
     getResults() {
        this.setState({
            joueurs: genericMetricsStore.getAllPlayers()
        });
    }

    // Va récupérer le status de la requête.
    getStatus() {
        this.setState({
            requestState: genericMetricsStore.getRequestStatus()
        })
    }

    render() {
    return (
        <div>
        <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
        </select><br/><br/>
        <MetricsTable />
        </div>
        
    );
    }
}