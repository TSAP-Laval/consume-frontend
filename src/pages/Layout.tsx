import * as React from "react";
import {Link} from "react-router"
import {Header} from "./Header";

import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";

import  ErrorStore  from "../components/Error/store";
import ErrorAlert from "../components/Error";

require('../sass/Layout');


export interface ILayoutProps {}

export interface ILayoutState {
    title?: string,
    Error?: string
}

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#2196F3",
    }
});

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
        this.getError = this.getError.bind(this);

        this.state = {
            title: "TSAP-Consume",
            Error: null
        }
    }

    componentWillMount() {
        ErrorStore.on("errorOccured", this.getError);
    }

    componentWillUnmount() {
    }

    getError() {
        this.setState({
            Error: ErrorStore.getError()
        })
    }

    render() {
        let errDiv = this.state.Error?
        <ErrorAlert Message={this.state.Error}/>:
        null;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Header/>
                    <main>
                        { errDiv }
                        {this.props.children}
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}
