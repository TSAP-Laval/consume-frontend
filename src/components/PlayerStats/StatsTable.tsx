import * as React from "react";

import StatStore from "./Store";
import Spinner from "../Elements/Spinner";
import {IPlayer, IPlayerStats} from "../../models/DatabaseModels";
import SmallContainer from "../Elements/SmallContainer";
import CustomTable from "../CustomTable/CustomTable";
import {ITeamSummary} from "../../models/DatabaseModelsSummaries";
import CustomRow from "../CustomTable/CustomRow";
import { Link } from 'react-router';


export interface IStatsProps {
    teamID: number
}

export interface IStatsState {
    loading?: boolean,
    player?: IPlayer
    playerStats?: IPlayerStats[]
}

export default class StatsTable extends React.Component<IStatsProps, IStatsState> {

    constructor() {
        super();

        this.state = {
            loading: StatStore.isFetching(),
            playerStats: []
        };

        this.changeLoadState = this.changeLoadState.bind(this);
        this.changePlayer = this.changePlayer.bind(this);
        this.changeStats = this.changeStats.bind(this);
    }


    changeLoadState() {
        this.setState({
            loading: StatStore.isFetching()
        });
    }

    changePlayer() {
        this.setState({
            player: StatStore.player
        });
    }

    changeStats() {
        this.setState({
            playerStats: StatStore.playerStats
        });
    }

    componentWillMount() {
        StatStore.on("FetchingStateChanged", this.changeLoadState);
        StatStore.on("PlayerChanged", this.changePlayer);
        StatStore.on("PlayerStatsChanged", this.changeStats);
    }

    componentWillUnmount() {
        StatStore.removeListener("FetchingStateChanged", this.changeLoadState);
        StatStore.removeListener("PlayerChanged", this.changePlayer);
        StatStore.removeListener("PlayerStatsChanged", this.changeStats);
    }

    private getMetricNames(): string[] {
        let metrics = [];
        if (this.state.playerStats.length > 0) {
            for (let key in this.state.playerStats[0].metrics) {
                if (this.state.playerStats[0].metrics.hasOwnProperty(key)) {
                    metrics.push(key);
                }
            }
        }

        return metrics.sort();
    }

    private getColumns(): string[][] {
        let cols = [["Adversaire"], ["Date"]];

        return cols.concat(this.getMetricNames().map(x => [x]));
    }

    private getRows() {
        let data: any[] = [];

        data = this.state.playerStats.map((p, i) => {
            // Identify adversary
            let adv: ITeamSummary;

            if (p.match.home_team.id !== this.props.teamID) {
                adv = p.match.home_team;
            } else {
                adv = p.match.away_team;
            }

            // Get date
            let date = p.match.date;

            let d = date.split(" ");
            d.splice(-2, 2);
            date = d.join(" ");

            let metrics = this.getMetricNames().map(mname => {
                return p.metrics[mname].toFixed(2).toString();
            });

            let url = "/team/" + this.props.teamID + "/matches/" + p.match.id;
            let m_data = ([adv.name, <Link to={url}>{date}</Link>] as any).concat(metrics);

            return <CustomRow key={i} data={m_data}/>
        });

        return data
    }

    render() {
        if (this.state.loading) {
            return <Spinner/>;
        }

        return (
            <SmallContainer>
                <CustomTable columns={this.getColumns()}>
                    {this.getRows()}
                </CustomTable>
            </SmallContainer>
        );
    }

}
