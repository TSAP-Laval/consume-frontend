import * as React from 'react';
import LoginComponent from "../components/Login";
import BigContent from "../components/Elements/BigContent";
import LoginStore from "../components/Login/Store";
import {browserHistory} from "react-router";

export interface ILoginProps {
}
export interface ILoginState {}

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor() {
        super();
    }

    render() {
        return (
            <BigContent>
                <LoginComponent/>
            </BigContent>
        )
    }
}