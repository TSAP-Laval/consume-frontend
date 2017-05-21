import * as React from 'react';

import LoginStore from "../components/Login/Store";
import {browserHistory} from "react-router";

export interface IIsAuthProps {}
export interface IIsAuthState {}

export default class IsAuthenticated extends React.Component<IIsAuthProps, IIsAuthState> {

    componentWillMount() {
        if (!LoginStore.isLoggedIn) {
            browserHistory.push("/login");
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
