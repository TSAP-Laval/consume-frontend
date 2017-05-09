import * as React from "react";
import Store from "./Store";
import MetricsTable from ".//MetricsTable";
import {Player} from "../../Models/DatabaseModels";
import * as ActionCreator from "./ActionsCreator";
import MetricRow from './MetricsRow';
import Spinner from "../Elements/Spinner";
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

export interface IDataProps {
    team_id: number
}

export interface IDataState {
    loading: boolean,
    players?: Player[],
    team_name?: string
}

export default class GenericMetricsView extends React.Component<IDataProps, IDataState> {

    constructor(props: IDataProps) {
        super(props);

        this.state = {
            loading: false,
            players: new Array<Player>()
        }

        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.onPlayersReceived = this.onPlayersReceived.bind(this);
    }

    setLoadingStatus() {
        this.setState({
            loading: Store.fetching
        })
    }

    onPlayersReceived() {
        this.setState({
            players: Store..players,
            team_name: Store.team_name
        });
    }

    componentWillMount(){
        Store.on("FETCH_PLAYERS", this.setLoadingStatus);
        Store.on("RECEIVE_PLAYERS", this.onPlayersReceived);
        ActionCreator.FetchPlayers(this.props.team_id)
    }

    componentWillUnmount(){
        Store.removeListener("FETCH_PLAYERS", this.onPlayersReceived);
        Store.removeListener("RECEIVE_PLAYERS", this.onPlayersReceived);
    }

     render() {
        let baseCols: Array<Array<String>> = [["Prénom", null], ["Nom", null]];
        let cols = baseCols.concat(this.state.joueurs.length > 0?

            //TODO: Refactor avec nouvelle entité de métrique
        this.state.players[0].metrics.map((metric) => {
            return [metric.name, "Moy. / Dernier / Norme"];
        }): []);

        let data = this.state.joueurs.map((joueur, i) => {
            let baseData: Array<string> = [joueur.first_name, joueur.last_name];
            let sortedMetrics = joueur.metrics.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            baseData = baseData.concat(sortedMetrics.map((metric) => {
                return metric.value.toFixed(2).toString().concat("  /  ", metric.last_match.toFixed(2).toString(), "  /  ", metric.standard.toFixed(2).toString());
            }));

            //TODO: Refactor avec nouvelle entité de métrique
            return <MetricRow key={i} playerID={joueur.id} teamID={this.props.team_id} Data={ baseData }/>
        });

        return (
            this.state.loading ?
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
