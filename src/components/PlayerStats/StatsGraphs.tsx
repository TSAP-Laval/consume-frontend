import * as React from "react";
import StatsTableStore from "./store";

import { CreateGetMatchesAction } from "./actions/GetMatchesAction";
import { CreateChangeFilterAction } from './actions/ChangeFilterAction';
import Status from "./models/Status";
import IMatch from "./models/IMatch";

import { IStatsState } from './StatsTable';

import Table from "./Table";

import { Chart } from 'chart.js';

import { ProgressBar } from 'react-bootstrap';

export interface IGraphsProps {
    teamID: number,
    playerID: number
}


export default class StatsGraphs extends React.Component<IGraphsProps, IStatsState> {

    refs: {
        [string: string]: (Element);
        statGraph: (HTMLElement);
    }

    colors: string[];

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

        this.colors = [
            "rgba(191, 63, 63, 255)",
            "rgba(63, 191, 63, 255)",
            "rgba(63, 63, 191, 255)"
        ]
    }

    componentWillMount() {
        StatsTableStore.on("dataChange", this.getResults);
        StatsTableStore.on("requestState", this.getStatus);
        StatsTableStore.on("seasons", this.getSeasons.bind(this));
        StatsTableStore.on("positions", this.getPositions.bind(this));
        StatsTableStore.on("filter", this.getFilters.bind(this));
    }

    componentWillUnmount() {
        StatsTableStore.removeListener("dataChange", this.getResults);
        StatsTableStore.removeListener("requestState", this.getStatus);
        StatsTableStore.removeListener("seasons", this.getSeasons.bind(this));
        StatsTableStore.removeListener("positions", this.getPositions.bind(this));
        StatsTableStore.on("filter", this.getFilters.bind(this));
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
            matches: StatsTableStore.getMatches(),
            requestState: StatsTableStore.getRequestStatus()
        }, this.drawGraph);
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

    drawGraph() {

        if (this.state.requestState == Status.Started) {
            return
        }
        let ctx : CanvasRenderingContext2D = (this.refs.statGraph as HTMLCanvasElement).getContext("2d");


        let points: {[label: string]: number[]} = {};
        let labels : string[] = [];
        for (let i = 0; i < this.state.matches.length; i++) {
            let match = this.state.matches[i];
            labels.push(match.date.toDateString());

            for (let j = 0; j < match.metrics.length; j++) {
                let metric = match.metrics[j];
                if (points[metric.name]) {
                    points[metric.name].push(metric.value);
                } else {
                    points[metric.name] = [metric.value];
                }
            }
        }

        let datasets: any[] = [];

        let i: number = 0;
        for (let key in points) {
            let value = points[key];
            let color: string = this.colors[i++];

            datasets.push({
                label: key,
                borderColor: color,
                pointBorderColor: color,
                pointRadius: 5,
                data: value
            });
        }

        let data = {
            labels: labels,
            datasets: datasets
        };

        let config: Chart.ChartConfiguration = {
            type: "line",
            data: data
        }
        let statChart = new Chart(ctx, config);
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

        let seasonOptions = [<option selected value="">-- Aucun Filtre --</option>].concat(this.state.seasons.map((season) =>(
            <option value={season.ID}>{season.Annees}</option>
        )));

        let positionOptions = [<option selected value="">-- Aucun Filtre --</option>].concat(this.state.positions.map((position) => (
            <option value={position.ID}>{position.Nom}</option>
        )));

        return (
            this.state.requestState == Status.Idle?
                <div>
                    <select onChange={this.handleSeasonChange.bind(this)} value={this.state.selectedSeasonID}>{seasonOptions}</select>
                    <select onChange={this.handlePositionChange.bind(this)} value={this.state.selectedPositionID}>{positionOptions}</select>
                    <canvas ref={"statGraph"} >
                    </canvas>
                </div>
            : <div>
                <h3>{ "Chargement..." }</h3>
                <ProgressBar active now={45} />
              </div>
        )
    }

}
