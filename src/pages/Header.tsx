import * as React from "react";

export interface ILayoutProps {}

export interface ILayoutState {}

export class Header extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>TSAP-Consume</h1>
            </div>
        );
    }
}