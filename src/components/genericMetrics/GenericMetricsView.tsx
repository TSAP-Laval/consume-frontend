import * as React from "react";
import genericMetricsStore from "../genericMetrics/GenericMetricsStore";
import IJoueur from "./models/IJoueur";
import Status from "./models/Status";
import { CreateGetPlayersAction } from "./actions/genericMetricsActions";

import CircularProgress from 'material-ui/CircularProgress';

import Spinner from "../Elements/Spinner";

import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import CustomTable from "../CustomTable/CustomTable"
import CustomRow from "../CustomTable/CustomRow"

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

        this.state = {
            requestState: genericMetricsStore.getRequestStatus(),
            joueurs: genericMetricsStore.getAllPlayers()
        }

        this.getStatus = this.getStatus.bind(this);
        this.getResults = this.getResults.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this)
        this.getTableData = this.getTableData.bind(this)
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

    getTableColumns() {
        let columns = new Array<String>()

         if(this.state.joueurs.length > 0) {
            columns = ["Prénom", "Nom"]

            columns = columns.concat(this.state.joueurs[0].metrics.map((metric) => {
                return metric.name
            }))

            columns.push("Voir Détails")
         }

        return columns
    }

    getTableData() {
        let data = new Array<any>()

        if(this.state.joueurs.length > 0) {
            data = this.state.joueurs.map((joueur, i) => {
                let rowData = new Array<any>()

                rowData = [joueur.first_name, joueur.last_name]
                rowData = rowData.concat(joueur.metrics.map((metric) => {
                    return metric.value.toFixed(2).toString().concat("  (",metric.last_match.toFixed(2).toString(),")")
                }))
                rowData.push(<FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.teamID + "/player/" + joueur.id}/>} />)

                return <CustomRow key={i} data={rowData}></CustomRow>
            })
        }

        return data
    }

     render() {
        if(this.state.requestState == Status.Idle) {
            let columns = this.getTableColumns()
            let data = this.getTableData()

            if((columns.length + data.length) == 0) {
                return(
                    <div>
                        <h2 className="text-center">Équipe <b>{this.state.nomEquipe}</b></h2>
                        <FlatButton primary={true} label={"Paramètres"} linkButton={true} containerElement={<Link to={"/team/" + this.props.teamID + "/settings"} />} />
                        <h3 className="text-center"><b>Aucun joueur trouvé</b></h3>
                    </div>
                )
            } else {
                return(
                    <div>
                        <h2 className="text-center">Équipe <b>{this.state.nomEquipe}</b></h2>
                        <FlatButton primary={true} label={"Paramètres"} linkButton={true} containerElement={<Link to={"/team/" + this.props.teamID + "/settings"} />} />
                        <CustomTable columns={columns}>
                            {data}
                        </CustomTable>
                    </div>
                )
            }
        } else {
            return(<Spinner />)
        }
    }
}
