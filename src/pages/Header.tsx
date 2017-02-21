import * as React from "react";

import AppBar from 'material-ui/AppBar';

import { Link } from "react-router"

export interface ILayoutProps {}

export interface ILayoutState {}

export class Header extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
    }

    render() {
        return (
            <AppBar className={"navbar"} title={"TSAP"} />
        );
    }
}
