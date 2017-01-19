import * as React from "react";
import {Link} from "react-router"
import {Header} from "./Header";

require('../sass/Layout.scss');

export interface ILayoutProps {}

export interface ILayoutState {}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
        this.state = {
            title: "TSAP-Consume"
        }
    }

    render() {
        return (
            <div>
                <Header/>
                    <main>
                        {this.props.children}
                    </main>
            </div>
        );
    }
}