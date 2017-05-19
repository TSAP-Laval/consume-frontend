import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import BigContent from "../components/Elements/BigContent";
import LoginStore from "../components/Login/store";
import Login from "../components/Login/Index";


export interface ILayoutProps {

}

export interface ILayoutState {
        isLoggedIn?: boolean
}

export default class Home extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
        this.userIsLoggedIn = this.userIsLoggedIn.bind(this);
        this.state ={
            isLoggedIn : LoginStore.userIsLoggedIn()
        }
    }

    userIsLoggedIn(){
        this.setState({
           isLoggedIn : LoginStore.userIsLoggedIn()
        }) 
    }

    render() {
        return (
            this.state.isLoggedIn ?
            <BigContent>
                <h1>Console TSAP</h1>              
                <p>
                   VOIR LA LISTE D'ÉQUIPES ICI...
                </p>
            </BigContent> :
            
            <Login />
        );
    }
}
