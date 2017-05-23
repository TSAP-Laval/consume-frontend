import * as React from "react";

import { IStatsState } from './StatsTable';
import StatStore from "./Store";

import { Chart } from 'chart.js';
import Spinner from "../Elements/Spinner";
import {ITeamSummary} from "../../models/DatabaseModelsSummaries";
import SmallContainer from "../Elements/SmallContainer";


export interface IGraphsProps {
    teamID: number
}


export default class StatsGraphs extends React.Component<IGraphsProps, IStatsState> {

    refs: {
        [string: string]: (Element);
        statGraph: (HTMLElement);
    };

    colors: string[];


    constructor() {
        super();

        this.state = {
            loading: StatStore.isFetching()
        };

        this.colors = [
            "rgba(191, 63, 63, 255)",
            "rgba(63, 191, 63, 255)",
            "rgba(63, 63, 191, 255)"
        ];

        this.changeLoadState = this.changeLoadState.bind(this);
        this.changePlayer = this.changePlayer.bind(this);
        this.changeStats = this.changeStats.bind(this);
        this.drawGraph = this.drawGraph.bind(this);
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
        }, this.drawGraph);
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

    private drawGraph() {
        if (this.state.loading) {
            return;
        }

        let ctx: CanvasRenderingContext2D = (this.refs.statGraph as HTMLCanvasElement).getContext("2d");

        let points: {[label: string]: number[]} = {};
        let labels: string[] = [];

        for (let i = 0; i < this.state.playerStats.length; i++) {
            let match = this.state.playerStats[i].match;
            let d = match.date.split(" ");
            d.splice(-2, 2);
            labels.push(d.join(" "));

            this.getMetricNames().forEach((m) => {
                let metricValue = this.state.playerStats[i].metrics[m];

                if (points[m]) {
                    points[m].push(metricValue);
                } else {
                    points[m] = [metricValue];
                }
            })
        }

        let datasets: any[] = [];

        let i: number = 0;
        for(let key in points) {
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
        };
        let statChart = new Chart(ctx, config);
    }

    render() {
        if (this.state.loading) {
            return <Spinner/>;
        }

        return (
            <SmallContainer>
                <canvas ref={"statGraph"}>
                </canvas>
            </SmallContainer>
        )
    }

}
