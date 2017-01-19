import * as React from "react";
import genericMetricsStore from "../genericMetrics/GenericMetricsStore";
import MetricsTable from "../genericMetrics/MetricsTable";
import IJoueur from "./models/IJoueur";
import Status from "./models/Status";
import { ProgressBar } from 'react-bootstrap';
import { CreateGetPlayersAction } from "./actions/genericMetricsActions";

//require('../../sass/Layout.scss');

// Represent the props reveived by the Component GenericMetrics.
export interface IDataProps {
    Width: number,
    Height: number
}

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
         //Pour afficher le nom et le prénom du joueur.
        let baseCols: Array<String> = ["Prénom", "Nom"];
        // Pour récupérer ces données.
        let cols = baseCols.concat(this.state.joueurs.length > 0? 
        this.state.joueurs[0].metrics.map((metric) => {
            return metric.name
        }): []);
        // Pour récupérer les mtrics.
        let data = this.state.joueurs.map((joueur) => {
            let baseData: Array<String> = [joueur.firstName, joueur.lastName];
            return baseData.concat(joueur.metrics.map((metric) => {
                return metric.value.toFixed(2).toString();
            }));
        });

        return (
            this.state.requestState == Status.Idle?
            <div>
                <MetricsTable columns={ cols } data={ data }/>
            </div>
            : <div>
                <h3>{ "Chargement..." }</h3>
                <ProgressBar active now={45} />
              </div>
        )
    }
}