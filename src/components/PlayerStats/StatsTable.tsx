import * as React from "react";
import StatsTableStore from "./store";

import { CreateGetMatchesAction } from "./actions/GetMatchesAction";
import { CreateChangeFilterAction } from "./actions/ChangeFilterAction";
import Status from "./models/Status";
import IMatch from "./models/IMatch";
import { ISeason } from "./models/ISeason";
import { IPosition } from "./models/IPosition";


import Table from "./Table";

import { ProgressBar } from 'react-bootstrap';

export interface IStatsProps {
    teamID: number,
    playerID: number
}

export interface IStatsState {
    requestState?: Status,
    matches?: IMatch[],
    seasons?: ISeason[],
    positions?: IPosition[]
    selectedSeasonID?: number
    selectedPositionID?: number
}

export default class StatsTable extends React.Component<IStatsProps, IStatsState> {

    constructor() {
        super();

        this.getStatus = this.getStatus.bind(this);
        this.getResults = this.getResults.bind(this);

        this.state = {
            requestState: StatsTableStore.getRequestStatus(),
            matches: StatsTableStore.getMatches(),
            seasons: StatsTableStore.getSeasons(),
            positions: StatsTableStore.getPositions()
        }
    }

    componentWillMount() {
        StatsTableStore.on("dataChange", this.getResults);
        StatsTableStore.on("requestState", this.getStatus)
        StatsTableStore.on("seasons", this.getSeasons.bind(this));
        StatsTableStore.on("positions", this.getPositions.bind(this));
        StatsTableStore.on("filter", this.getFilters.bind(this));
    }

    componentWillUnmount() {
        StatsTableStore.removeListener("dataChange", this.getResults);
        StatsTableStore.removeListener("requestState", this.getStatus);
        StatsTableStore.removeListener("seasons", this.getSeasons.bind(this));
        StatsTableStore.removeListener("positions", this.getPositions.bind(this));
        StatsTableStore.removeListener("filter", this.getFilters.bind(this));
    }

    getFilters() {
        this.setState({
            selectedSeasonID: StatsTableStore.getSelectedSeason(),
            selectedPositionID: StatsTableStore.getSelectedPosition()
        });
    }

    getPositions() {
        this.setState({
            positions: StatsTableStore.getPositions()
        });
    }

    getSeasons() {
        this.setState({
            seasons: StatsTableStore.getSeasons()
        });
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

    handleSeasonChange(e: any) {
        CreateChangeFilterAction(e.target.value, this.state.selectedPositionID, this.props.playerID, this.props.teamID);
    }

    handlePositionChange(e: any) {
        CreateChangeFilterAction(this.state.selectedSeasonID, e.target.value, this.props.playerID, this.props.teamID);
    }

    render() {
        let baseCols: Array<String> = ["Adversaire", "Date"];

        let cols = baseCols.concat(this.state.matches.length > 0?
        this.state.matches[0].metrics.map((metric) => {
            return metric.name
        }): []);

        let data = this.state.matches.map((match) => {
            let baseData: Array<String> = [match.opposing.name, match.date.toDateString()];
            return baseData.concat(match.metrics.map((metric) => {
                return metric.value.toFixed(2).toString();
            }));
        });

        let seasonOptions = this.state.seasons.map((season) =>(
            <option value={season.ID}>{season.Annees}</option>
        ));

        let positionOptions = this.state.positions.map((position) => (
            <option value={position.ID}>{position.Nom}</option>
        ));

        return (
            this.state.requestState == Status.Idle?
            <div>
                <select onChange={this.handleSeasonChange.bind(this)} value={this.state.selectedSeasonID}>{seasonOptions}</select>
                <select onChange={this.handlePositionChange.bind(this)} value={this.state.selectedPositionID}>{positionOptions}</select>
                <Table columns={ cols } data={ data }/>
            </div>
            : <div>
                <h3>{ "Chargement..." }</h3>
                <ProgressBar active now={45} />
              </div>
        )
    }

}
