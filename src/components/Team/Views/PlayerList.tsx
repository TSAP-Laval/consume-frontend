import * as React from "react";
import TeamStore from "../Stores/TeamStore"
import MetricStatsStore from "../Stores/MetricStatsStore";
import {IPlayer, ITeam, ITeamMetricStats} from "../../../models/DatabaseModels";
import * as ActionsCreator from "../ActionsCreator";
import Spinner from "../../Elements/Spinner";
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import BigContent from "../../Elements/BigContent";
import LoginStore from "../../Login/Store";
import Login from "../../Login/index";

export interface ILayoutProps {
    params: {
        team_id: number
    }
}

export interface ILayoutState {
    loading_team?: boolean
    loading_stats?: boolean
    team?: ITeam
    stats?: ITeamMetricStats
}

export default class PlayerList extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
            loading_team: true,
            loading_stats: true
        };

        this.setLoadingStatus = this.setLoadingStatus.bind(this);
        this.setTeam = this.setTeam.bind(this);
        this.setTeamMetricStats = this.setTeamMetricStats.bind(this);
        this.getTableColumns = this.getTableColumns.bind(this);
        this.getTableData = this.getTableData.bind(this);
    }

    componentWillMount(){
        TeamStore.on("FETCH_TEAM", this.setLoadingStatus);
        TeamStore.on("RECEIVE_TEAM", this.setTeam);
        MetricStatsStore.on("FETCH_TEAM_METRIC_STATS", this.setLoadingStatus);
        MetricStatsStore.on("RECEIVE_TEAM_METRIC_STATS", this.setTeamMetricStats);
        MetricStatsStore.on("METRICS_RECEIVED", this.onMetricChange)
    }

    onMetricChange() {
        ActionsCreator.FetchTeam(this.props.params.team_id, LoginStore.token);
        ActionsCreator.FetchTeamMetricStats(this.props.params.team_id, LoginStore.token);
    }

    componentDidMount() {
        if(TeamStore.teamExists(this.props.params.team_id)) {
            this.setTeam();
        } else {
            ActionsCreator.FetchTeam(this.props.params.team_id, LoginStore.token);
        }

        if(MetricStatsStore.teamMetricStatsExists(this.props.params.team_id)) {
            this.setTeamMetricStats()
        } else {
            ActionsCreator.FetchTeamMetricStats(this.props.params.team_id, LoginStore.token);
        }
    }

    componentWillUnmount(){
        TeamStore.removeListener("FETCH_TEAM", this.setLoadingStatus);
        TeamStore.removeListener("RECEIVE_TEAM", this.setTeam);
        MetricStatsStore.removeListener("FETCH_TEAM_METRIC_STATS", this.setLoadingStatus);
        MetricStatsStore.removeListener("RECEIVE_TEAM_METRIC_STATS", this.setTeamMetricStats);
        MetricStatsStore.removeListener("METRICS_RECEIVED", this.onMetricChange)
    }

    setLoadingStatus() {
        this.setState({
            loading_team: TeamStore.fetching,
            loading_stats: MetricStatsStore.fetching
        });
    }

    setTeam() {
        this.setState({
            loading_team: TeamStore.fetching,
            team: TeamStore.teams[this.props.params.team_id.toString()]
        })
    }

    setTeamMetricStats() {
        this.setState({
            loading_stats: MetricStatsStore.fetching,
            stats: MetricStatsStore.metric_stats[this.props.params.team_id.toString()]
        });
    }

    getTableData() {
        let data: Array<any> = [];

        if(this.state.team.players.length > 0) {
            data = this.state.team.players.map((player: IPlayer, i: number) => {
                let rowData: Array<any> = [player.first_name, player.last_name];

                if(this.state.team.metrics.length > 0) {
                    let player_metrics: {[metric_id: string] : {avg: number, last: number}} = this.state.stats.player_metrics[player.id];

                    let metric_ids: Array<number> = this.state.team.metrics.map((metric) => {
                        return metric.id;
                    });

                    for (let id of metric_ids) {
                        let metric_avg: number = this.state.stats.metrics_avg[id.toString()];
                        let metric_data: { avg: number, last: number } = player_metrics[id.toString()];
                        rowData.push(metric_data.avg.toFixed(2).toString() + " / " + metric_data.last.toFixed(2).toString() + " / " + metric_avg.toFixed(2).toString());
                    }
                }

                rowData.push(<FlatButton primary={true} label="Voir" containerElement={<Link to={"/team/" + this.props.params.team_id + "/player/" + player.id}/>} />);

                return <CustomRow key={i} data={rowData}/>
            })
        }
        return data
    }

    getTableColumns() {
        let columns: Array<Array<string>> = [];

        if(this.state.team.players.length > 0) {
            columns = [["Prénom"], ["Nom"]];

            if(this.state.team.metrics.length > 0) {
                columns = columns.concat(this.state.team.metrics.map((metric) => {
                    return [metric.name, "Moy. / Dernier / Norme"];
                }));
            }

            columns.push(["Voir Détails"]);
        }

        return columns;
    }

    render() {
        if(!this.state.loading_stats && !this.state.loading_team) {
            let columns = this.getTableColumns();
            let data = this.getTableData();

            if((columns.length + data.length) == 0) {
                return(
                    <BigContent>
                        <h2 className="text-center">Équipe <b>{this.state.team.name}</b></h2>
                        <FlatButton primary={true} label={"Paramètres"} containerElement={<Link to={"/team/" + this.props.params.team_id + "/settings"} />} />
                        <h3 className="text-center"><b>Aucun joueur trouvé</b></h3>
                    </BigContent>
                )
            } else {
                return(
                    <BigContent>
                        <h2 className="text-center">Équipe <b>{this.state.team.name}</b></h2>
                        <FlatButton primary={true} label={"Paramètres"} containerElement={<Link to={"/team/" + this.props.params.team_id + "/settings"} />} />
                        <CustomTable columns={columns}>
                            {data}
                        </CustomTable>
                    </BigContent>
                )
            }
        } else {
            return(<BigContent><Spinner /></BigContent>)
        }
    }
}
