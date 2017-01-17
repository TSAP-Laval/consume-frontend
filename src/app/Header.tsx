import * as React from "react";

export interface ILayoutProps {}

export interface ILayoutState {
    title: string
}

export class Header extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
    }

    render() {
        return (
            <header><h1>TSAP-Consume</h1></header>
        );
    }
}