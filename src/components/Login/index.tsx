import * as React from "react";
import { TextField, FlatButton } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Store from "./Store";
import * as ActionCreator from "./ActionCreator"

export interface ILoginProps {
}

export interface ILoginState {
    email?: string,
    password?: string,
}

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super();
        this.onLogin = this.onLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
          this.state = {
            email: '',
            password:''
        }
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
        return (
            <div style={{ paddingTop: '100px', maxWidth: '400px', margin: '0 auto' }}>
                <AppBar
                    title="Zone membre" showMenuIconButton={false}
                />
                <TextField
                    ref='email'
                    floatingLabelText='Entrer votre courriel'
                    multiLine={false}
                    fullWidth={true}
                    value ={this.state.email}
                    name='email'
                onChange={this.handleEmailChange} 
                />
                <br />
                <TextField
                    ref='password'
                    floatingLabelText='Entrer votre mot de passe'
                    multiLine={false}
                    fullWidth={true}
                    type="password"
                    name='password'
                onChange={this.handlePasswordChange}
                />
                <div style={{ float: 'right' }}>
                    <FlatButton label="Connexion" primary={true} onClick={this.onLogin} />
                </div>
            </div>
        );
    }
}
