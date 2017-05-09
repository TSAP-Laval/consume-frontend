import * as React from "react";
import {Link} from "react-router"
import {Header} from "./Header";

import { injectGlobal } from 'styled-components';

import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";

import  ErrorStore  from "../components/Error/Store";
import ErrorAlert from "../components/Error";


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

// Global Styling
injectGlobal`
    @font-face {
        font-family: 'Roboto', sans-serif;
    }

    html, body, #root, #root > div, main {
        position: relative;
        height: 100%;
        max-height: 100%;
        width: 100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
    }
`;

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
