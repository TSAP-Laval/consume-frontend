import * as React from "react";

import { Alert, Button } from "react-bootstrap";

require('../../sass/Error.scss');

export interface IErrorProps {
    Message: string
};
export interface IErrorState {
    alertVisible: boolean
}; 

export default class ErrorAlert extends React.Component<IErrorProps, IErrorState> {

    constructor() {
        super()
        this.state = {
            alertVisible: true
        }

        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }

    render() {
        if (this.state.alertVisible) {
            return (
                <Alert className="errorDiv" bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                    <h4> Une erreur est survenue! </h4>
                    <p>{ this.props.Message.toString() }</p>
                </Alert>
            );
        }

        return null;
    }

    handleAlertDismiss() {
        this.setState({alertVisible: false});
    }

}