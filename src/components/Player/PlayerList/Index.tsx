import * as React from "react";
import Store from "./Store";
import {IPlayer, ITeamMetricStats} from "../../../models/DatabaseModels";
import * as ActionCreator from "./ActionsCreator";
import Spinner from "../../Elements/Spinner";
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import {IMetricSummary} from "../../../models/DatabaseModelsSummaries";

export interface IDataProps {
    params: {
        team_id: number,
        team_name: string,
        players: IPlayer[],
        metrics: IMetricSummary[]
    }
}

export interface IDataState {
    loading?: boolean,
    stats?: ITeamMetricStats
}

export default class PlayerList extends React.Component<IDataProps, IDataState> {
    constructor(props: IDataProps) {
        super(props);

        this.state = {
            loading: false,
        };

        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.onStatsReceived = this.onStatsReceived.bind(this);
    }

    setLoadingStatus() {
        this.setState({
            loading: Store.fetching
        })
    }

    onStatsReceived() {
        this.setState({
            loading: Store.fetching,
            stats: Store.stats
        });
    }

    getTableData() {
        let data: Array<any> = [];

        if(this.props.params.players.length > 0) {
            data = this.props.params.players.map((player: IPlayer, i: number) => {
                let rowData: Array<any> = [player.first_name, player.last_name];

                if(this.props.params.metrics.length > 0) {
                    let player_metrics: {[metric_id: string] : {avg: number, last: number}} = this.state.stats.player_metrics[player.id];

                    let metric_ids: Array<number> = this.props.params.metrics.map((metric) => {
                        return metric.id;
                    });

                    for (let id in metric_ids) {
                        let metric_data: { avg: number, last: number } = player_metrics[id.toString()];
                        rowData.push(metric_data.avg.toFixed(2).toString() + " (" + metric_data.last.toFixed(2).toString() + ")")
                    }
                }

                rowData.push(<FlatButton primary={true} label="Voir" linkButton={true} containerElement={<Link to={"/team/" + this.props.params.team_id+ "/player/" + player.id}/>} />);

                return <CustomRow key={i} data={rowData}/>
            })
        }
        return data
    }

    getTableColumns() {
        let columns: Array<string> = [];

        if(this.props.params.players.length > 0) {
            columns = ["Prénom", "Nom"];

            if(this.props.params.metrics.length > 0) {
                columns = columns.concat(this.props.params.metrics.map((metric) => {
                    return metric.name;
                }));
            }

            columns.push("Voir Détails");
        }

        return columns;
    }

    componentWillMount(){
        Store.on("FETCH_PLAYERS", this.setLoadingStatus);
        Store.on("RECEIVE_PLAYERS", this.onStatsReceived);
        ActionCreator.FetchTeamMetricStats(this.props.params.team_id);
    }

    componentWillUnmount(){
        Store.removeListener("FETCH_PLAYERS", this.onStatsReceived);
        Store.removeListener("RECEIVE_PLAYERS", this.onStatsReceived);
    }

    render() {
        if(this.state.loading) {
            let columns = this.getTableColumns();
            let data = this.getTableData();

            if((columns.length + data.length) == 0) {
                return(
                    <div>
                        <h2 className="text-center">Équipe <b>{this.props.params.team_name}</b></h2>
                        <FlatButton primary={true} label={"Paramètres"} linkButton={true} containerElement={<Link to={"/team/" + this.props.params.team_id + "/settings"} />} />
                        <h3 className="text-center"><b>Aucun joueur trouvé</b></h3>
                    </div>
                )
            } else {
                return(
                    <div>
                        <h2 className="text-center">Équipe <b>{this.props.params.team_name}</b></h2>
                        <FlatButton primary={true} label={"Paramètres"} linkButton={true} containerElement={<Link to={"/team/" + this.props.params.team_id + "/settings"} />} />
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
