import * as React from "react";
import { TextField, FlatButton } from 'material-ui';
import AppBar from 'material-ui/AppBar';
import Store from "./Store";
import * as ActionCreator from "./ActionCreator";

export interface ILoginProps {
}

export interface ILoginState {
    email?: string,
    password?: string,
    emailError?:string,
    passwordError?:string,
}

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super();
        this.onLogin = this.onLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
          this.state = {
            email: '',
            password:'',
            emailError: '',
            passwordError: ''
        }
    }

    onLogin() {
        if(this.state.emailError.length > 0 || this.state.passwordError.length > 0)
            return;

        ActionCreator.CreateAuthenticateUserAction(this.state.email, this.state.password);
        
    }

    handleEmailChange(e: any) {
        this.setState({ email:  e.target.value})
    }

    validateEmail(){
        let regex  = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
        if(this.state.email.trim().length == 0){
            this.setState({emailError: "Le champ courriel est requis."})

        } else if (!this.state.email.match(regex)) {
            this.setState({emailError: "Veuillez entrer un courriel valide."})
        } 
        else{
            this.setState({emailError: ''})
        }
    }

     validatePassword(){
        if(this.state.password.trim().length == 0){
            this.setState({passwordError: "Le champ mot de passe est requis."})

        } else if(this.state.password.trim().length < 4){
            this.setState({passwordError: "Le champ mot de passe doit avoir au moins 4 caractères."})
        }    
        else{
            this.setState({passwordError: ''})
        }
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
                    floatingLabelText='Courriel'
                    multiLine={false}
                    fullWidth={true}
                    value ={this.state.email}
                    name='email'
                    errorText = {this.state.emailError}
                onChange={this.handleEmailChange}
                onBlur={this.validateEmail}
                />
                <br />
                <TextField
                    ref='password'
                    floatingLabelText='Mot de passe'
                    multiLine={false}
                    fullWidth={true}
                    type="password"
                    name='password'
                    errorText = {this.state.passwordError}
                onChange={this.handlePasswordChange}
                onBlur={this.validatePassword}
                />
                <div style={{ float: 'right' }}>
                    <FlatButton label="Connexion" primary={true} onClick={this.onLogin} />
                </div>
            </div>
        );
    }
}