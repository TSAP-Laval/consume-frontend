import * as React from "react";
import StatsTableStore from "./store";

import { CreateGetMatchesAction } from "./actions/GetMatchesAction";
import Status from "./models/Status";
import IMatch from "./models/IMatch";

import Table from "./Table";

export interface IStatsProps {}

export interface IStatsState {
    requestState?: Status,
    matches?: IMatch[]
}

export default class StatsTable extends React.Component<IStatsProps, IStatsState> {

    constructor() {
        super();

        this.getStatus = this.getStatus.bind(this);
        this.getResults = this.getResults.bind(this);

        this.state = {
            requestState: StatsTableStore.getRequestStatus(),
            matches: StatsTableStore.getMatches()
        }
    }

    componentWillMount() {
        StatsTableStore.on("dataChange", this.getResults);
        StatsTableStore.on("requestState", this.getStatus)
        CreateGetMatchesAction(127, 3);
    }

    componentWillUnmount() {
        StatsTableStore.removeListener("dataChange", this.getResults);
        StatsTableStore.removeListener("requestState", this.getStatus);
    }

    getResults() {
        this.setState({
            matches: StatsTableStore.getMatches()
        });
    }

    getStatus() {
        this.setState({
            requestState: StatsTableStore.getRequestStatus()
        })
    }

    render() {
        let baseCols: Array<String> = ["Adversaire", "Date"];

        let cols = baseCols.concat(this.state.matches.length > 0? 
        this.state.matches[0].metrics.map((metric) => {
            return metric.name
        }): []);

        let data = this.state.matches.map((match) => {
            let baseData: Array<String> = [match.opposing.name, match.date.toString()];
            return baseData.concat(match.metrics.map((metric) => {
                return metric.value.toFixed(2).toString();
            }));
        });

        return (
            <div>
                <p>State: { this.state.requestState }</p>
                <p>Matches: { this.state.matches.length }</p>
                <Table columns={ cols } data={ data }/>
            </div>
        )
    }

}