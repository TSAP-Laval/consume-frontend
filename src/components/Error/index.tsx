import * as React from "react";

import Snackbar from 'material-ui/Snackbar';

export interface IErrorProps {
    Message: string
};
export interface IErrorState {
    alertVisible: boolean
};

export default class ErrorAlert extends React.Component<IErrorProps, IErrorState> {

    constructor() {
        super();
        this.state = {
            alertVisible: true
        };

        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }

    render() {

        return (
            <Snackbar
                open={this.state.alertVisible}
                message={"Une erreur est survenue: " + this.props.Message.toString()}
                autoHideDuration={4000}
                onRequestClose={this.handleAlertDismiss.bind(this)}
            />
        )
    }

    handleAlertDismiss() {
        this.setState({alertVisible: false});
    }

}
