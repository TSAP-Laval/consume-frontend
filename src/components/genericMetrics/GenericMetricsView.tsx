import * as React from "react";
import genericMetricsStore from "../genericMetrics/GenericMetricsStore";
import MetricsTable from "../genericMetrics/MetricsTable";
import IJoueur from "./models/IJoueur";
import Status from "./models/Status";
import { CreateGetPlayersAction } from "./actions/genericMetricsActions";

import CircularProgress from 'material-ui/CircularProgress';

import MetricRow from './MetricsRow';

import Spinner from "../Elements/Spinner";

import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';

// Represent the props reveived by the Component GenericMetrics.
export interface IDataProps {
    teamID: number
}

export interface IDataStates {
    requestState?: Status,
    joueurs?: IJoueur[],
    nomEquipe?: string
}

//This component will display all metrics from a team.
export default class GenericMetricsView extends React.Component<IDataProps, IDataStates> {

    constructor(props: IDataProps) {
        super();

         this.getStatus = this.getStatus.bind(this);
        this.getResults = this.getResults.bind(this);

        this.state = {
            requestState: genericMetricsStore.getRequestStatus(),
            joueurs: genericMetricsStore.getAllPlayers()
        }
    }

    // Will fetch and load the data.
    componentWillMount(){
        genericMetricsStore.on("dataChange", this.getResults);
        genericMetricsStore.on("requestState", this.getStatus);
        CreateGetPlayersAction(this.props.teamID);
    }

    // Pour la gestion de mémoire on supprime les listener d'events.
    componentWillUnmount(){
        genericMetricsStore.removeListener("dataChange", this.getResults);
        genericMetricsStore.removeListener("requestState", this.getStatus);
    }

    // Va récupérer les joueurs du store.
     getResults() {
        this.setState({
            joueurs: genericMetricsStore.getAllPlayers(),
            nomEquipe: genericMetricsStore.getTeamName()
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
        // Pour récupérer les noms des colonnes qui seront afffichées.
        let cols = baseCols.concat(this.state.joueurs.length > 0?
        this.state.joueurs[0].metrics.map((metric) => {
            return metric.name
        }): []);

        // Pour récupérer les metrics.
        let data = this.state.joueurs.map((joueur, i) => {
            let baseData: Array<string> = [joueur.first_name, joueur.last_name];
            let sortedMetrics = joueur.metrics.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            baseData = baseData.concat(sortedMetrics.map((metric) => {
                return metric.value.toFixed(2).toString().concat("  (",metric.last_match.toFixed(2).toString(),")");
            }));

            return <MetricRow key={i} playerID={joueur.id} teamID={this.props.teamID} Data={ baseData }/>
        });

        return (
            this.state.requestState == Status.Idle?
            <div>
                <h2 className="text-center">Équipe <b>{this.state.nomEquipe}</b></h2>
                <FlatButton primary={true} label={"Paramètres"} linkButton={true} containerElement={<Link to={"/team/" + this.props.teamID + "/settings"} />} />
                <MetricsTable columns={ cols }>
                    { data }
                </MetricsTable>
            </div>
            : <Spinner />
        )
    }
}
