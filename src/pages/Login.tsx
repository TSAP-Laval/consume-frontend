import * as React from 'react';
import LoginComponent from "../components/Login";
import AllContainer from "../components/Elements/AllContainer";


export interface ILoginProps {
}
export interface ILoginState {}

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor() {
        super();
    }

    render() {
        return (
            <AllContainer>
                <LoginComponent/>
            </AllContainer>
        )
    }
}