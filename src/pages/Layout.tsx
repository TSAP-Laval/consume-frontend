import * as React from "react";
import {Link} from "react-router"
import {Header} from "./Header";
import {Footer} from "./Footer"

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
                    {this.props.children}
                <Footer/>
            </div>
        );
    }
}