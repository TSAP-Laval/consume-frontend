import * as React from "react";

import {Header} from "../../app/Header";

import {Footer} from "../../app/Footer"

require('../../sass/Layout.scss');

export interface ILayoutProps {
    title: string
}

export interface ILayoutState {
    title: string
}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props : ILayoutProps) {
        super(props);
    }

    render() {
        const greating = "Hello World";
        return (
            <div>
            <Header title="TSAP Consume Props"/>
            <h1>{greating}!</h1>
            <Footer/>
            </div>
        );
    }
}