import * as React from "react";

import { IStatsState } from './StatsTable';
import StatStore from "./Store";

import { Chart } from 'chart.js';
import Spinner from "../Elements/Spinner";


export interface IGraphsProps {
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
    }

    changeLoadState() {
        this.setState({
            loading: StatStore.isFetching()
        });
    }

    componentWillMount() {
        StatStore.on("FetchingStateChanged", this.changeLoadState);
    }

    componentWillUnmount() {
        StatStore.removeListener("FetchingStateChanged", this.changeLoadState);
    }

    render() {
        if (this.state.loading) {
            return <Spinner/>;
        }

        return <h1>Graph</h1>
    }

}
