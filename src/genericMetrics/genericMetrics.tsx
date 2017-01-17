import * as React from "react";

//require('../../sass/Layout.scss');

// Represent the props reveived by the Component GenericMetrics.
export interface IDataProps {}

export interface IDataStates {
    title: string
}

export class GenericMetrics extends React.Component<IDataProps, IDataStates> {

    constructor() {
        super();
        this.state = {
            title: "TSAP"
        }
    }

    render() {
        const greating = "Hello World";
        return (
            <h1>{greating}!</h1>
        );
    }
}