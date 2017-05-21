import * as React from "react";
import { TextField, FlatButton } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Store from "./Store";
import * as ActionCreator from "./ActionCreator"

export interface ILoginProps { }

export interface ILoginState {
    email?: string,
    password?: string
}

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super(props);
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

    // Will fetch and load the data.
    componentWillMount() {
        Store.on("AuthSucceed", this.onLogin);
    }

    // Pour la gestion de mémoire on supprime les listener d'events.
    componentWillUnmount() {
        Store.removeListener("AuthSucceed", this.onLogin);
    }

    render() {
        return (
            <div style={{ paddingTop: '100px', maxWidth: '400px', margin: '0 auto' }}>
                <AppBar
                    title="Login" showMenuIconButton={false}
                />
                <TextField
                    ref='email'
                    floatingLabelText='Enter your email'
                    multiLine={false}
                    fullWidth={true}
                    value ={this.state.email}
                    name='email'
                onChange={this.handleEmailChange} 
                />
                <br />
                <TextField
                    ref='password'
                    floatingLabelText='Enter your Password'
                    multiLine={false}
                    fullWidth={true}
                    type="password"
                    name='password'
                onChange={this.handlePasswordChange}
                />
                <div style={{ float: 'right' }}>
                    <FlatButton label="login" primary={true} onClick={this.onLogin} />
                </div>
            </div>
        );
    }
}