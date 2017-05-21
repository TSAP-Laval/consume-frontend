import * as React from 'react';
import LoginComponent from "../components/Login";
import BigContent from "../components/Elements/BigContent";
import LoginStore from "../components/Login/Store";
import {browserHistory} from "react-router";

export interface ILoginProps {
}
export interface ILoginState {
    redirectTarget?: string
}

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor() {
        super();

        this.state = {
            redirectTarget: "/team"
        };

        this.validateLogin = this.validateLogin.bind(this);
    }

    validateLogin() {
        browserHistory.push(this.state.redirectTarget);
    }

    componentWillMount() {
        LoginStore.on("AuthSucceed", this.validateLogin);
    }

    componentWillUnmount() {
        LoginStore.removeListener("AuthSucceed", this.validateLogin);
    }

    render() {
        return (
            <BigContent>
                <LoginComponent/>
            </BigContent>
        )
    }
}
