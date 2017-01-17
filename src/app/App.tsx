import * as React from "react";
import {Header} from "./Header";
import {Footer} from "./Footer"
import {ArrowMap} from "../ArrowMap/Index"

export interface ILayoutProps {}

export interface ILayoutState {}

export class App extends React.Component<ILayoutProps, ILayoutState> {
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
                <ArrowMap height={800}/>
                <Footer/>
            </div>
        );
    }
}