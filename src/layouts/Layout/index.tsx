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
        const title = "TSAP consume Props";
        return (
            <div>
            <Header title = {title}/>
            <h1>{greating}!</h1>
            <Footer/>
            </div>
        );
    }
}