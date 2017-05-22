import * as React from 'react';
import LoginComponent from "../components/Login";
import BigContent from "../components/Elements/BigContent";

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