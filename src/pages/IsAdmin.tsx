import * as React from 'react';

import LoginStore from "../components/Login/Store";
import {browserHistory} from "react-router";

export interface IIsAuthProps {}
export interface IIsAuthState {}

export default class IsAdmin extends React.Component<IIsAuthProps, IIsAuthState> {

    componentWillMount() {
        if (!LoginStore.isAdmin()) {
            browserHistory.push("/team");
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
