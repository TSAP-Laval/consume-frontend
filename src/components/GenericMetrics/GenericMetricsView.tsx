import * as React from "react";
import Store from "./Store";
import {Player} from "../../Models/DatabaseModels";
import * as ActionCreator from "./ActionsCreator";
import Spinner from "../Elements/Spinner";
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import CustomTable from "../../components/CustomTable/CustomTable"
import CustomRow from "../../components/CustomTable/CustomRow"

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
            players: Store.players,
            team_name: Store.team_name
        });
    }

    getTableData() {
        let data = new Array<any>();

        if(this.state.players.length > 0) {
            data = this.state.players.map((player: Player, i: number) => {
                let rowData: Array<any>;

                rowData = [player.first_name, player.last_name];

                //TODO: Refactor avec nouvelle entité de métrique
                rowData = rowData.concat(player.metrics.map((metric) => {
                    return metric.value.toFixed(2).toString().concat("  (",metric.last_match.toFixed(2).toString(),")")
                }));
                rowData.push(<FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.team_id+ "/player/" + player.id}/>} />);

                return <CustomRow key={i} data={rowData}/>
            })
        }

        return data
    }

    getTableColumns() {
        let columns = new Array<String>();

        if(this.state.players.length > 0) {
            columns = ["Prénom", "Nom"];

            columns = columns.concat(this.state.players[0].metrics.map((metric) => {
                    return metric.name;
                }));

            columns.push("Voir Détails");
        }

        return columns;
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
        if(this.state.loading) {
            let columns = this.getTableColumns();
            let data = this.getTableData();

            if((columns.length + data.length) == 0) {
                return(
                    <div>
                        <h2 className="text-center">Équipe <b>{this.state.nomEquipe}</b></h2>
                        <FlatButton primary={true} label={"Paramètres"} linkButton={true} containerElement={<Link to={"/team/" + this.props.team_id+ "/settings"} />} />
                        <h3 className="text-center"><b>Aucun joueur trouvé</b></h3>
                    </div>
                )
            } else {
                return(
                    <div>
                        <h2 className="text-center">Équipe <b>{this.state.team_name}</b></h2>
                        <FlatButton primary={true} label={"Paramètres"} linkButton={true} containerElement={<Link to={"/team/" + this.props.team_id + "/settings"} />} />
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
