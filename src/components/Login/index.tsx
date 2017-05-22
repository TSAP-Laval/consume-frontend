import * as React from "react";
import { TextField, FlatButton } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Store from "./Store";
import * as ActionCreator from "./ActionCreator"
import {Status} from "../PlayerStats/Models/Status";
import Spinner from "../Elements/Spinner";

export interface ILoginProps {
}

export interface ILoginState {
    email?: string,
    password?: string,
    error?: string
    requestState?: Status
}

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super();
        this.state = {
            email: '',
            password:'',
            error: '',
            requestState: Store.requestStatus
        };

        this.onLogin = this.onLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.setError = this.setError.bind(this);
        this.setRequestState = this.setRequestState.bind(this)
    }

    componentWillMount() {
        Store.on("errorState", this.setError);
        Store.on("requestState", this.setRequestState);
    }

    componentWillUnmount() {
        Store.removeListener("errorState", this.setError);
        Store.removeListener("requestState", this.setRequestState);
    }

    setRequestState() {
        this.setState({
            requestState: Store.requestStatus
        });
    }

    setError() {
        this.setState({
            error: Store.error
        });
    }

    onLogin() {
        ActionCreator.CreateAuthenticateUserAction(this.state.email, this.state.password);
    }

    handleEmailChange(e: any) {
        this.setState({ email:  e.target.value})
    }

    handlePasswordChange(e: any) {
        this.setState({ password: e.target.value})
    }

    render() {
        if (this.state.requestState === Status.Started) {
            return <Spinner/>
        }

        return (
            <div style={{ paddingTop: '100px', maxWidth: '400px', margin: '0 auto' }}>
                <AppBar
                    title="Connexion" showMenuIconButton={false}
                />
                <TextField
                    ref='email'
                    floatingLabelText='Courriel'
                    multiLine={false}
                    fullWidth={true}
                    value ={this.state.email}
                    name='email'
                    onChange={this.handleEmailChange}
                    errorText={this.state.error}
                />
                <br />
                <TextField
                    ref='password'
                    floatingLabelText='Mot de passe'
                    multiLine={false}
                    fullWidth={true}
                    type="password"
                    name='password'
                    onChange={this.handlePasswordChange}
                    errorText={this.state.error}
                />
                <div style={{ float: 'right' }}>
                    <FlatButton label="Connexion" primary={true} onClick={this.onLogin} />
                </div>
            </div>
        );
    }
}
