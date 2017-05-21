import * as React from "react";
import BigContent from "../components/Elements/BigContent";
import Li from '../components/Elements/Li';
import LoginStore from "../components/Login/Store";
import {RaisedButton} from "material-ui";
import { Link } from 'react-router';


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

    componentWillMount(){
        LoginStore.on("AuthSucceed", this.userIsLoggedIn);
    }

    componentWillUnmount(){
        LoginStore.removeListener("AuthSucceed", this.userIsLoggedIn);
    }

    userIsLoggedIn(){
        this.setState({
           isLoggedIn : LoginStore.userIsLoggedIn()
        }) 
    }

    render() {
        return(
            <BigContent>
                <ul>
                <Li><Link to="/team/3"><RaisedButton primary={true} label="Statistiques de l'équipe"/></Link></Li><br/>
                <Li><Link to="/team/3/matches"><RaisedButton primary={true} label="Liste de matchs"/></Link></Li><br/>
                <Li><Link to="/team/3/players"><RaisedButton primary={true} label="Liste de joueurs"/></Link></Li>
                <Li><Link to="/teams/3/matches/1"><RaisedButton primary={true} label="ActionMap"/></Link></Li>
                <Li><Link to="/users"><RaisedButton primary={true} label="Gestion des utilisateurs" /></Link></Li>
                </ul>
            </BigContent>
        )
    }
    /*render() {
        if(this.state.isLoggedIn) {
            return(
                <BigContent>
                    <h1>Console TSAP</h1>
                    <p>
                        VOIR LA LISTE D'ÉQUIPES ICI...
                    </p>
                </BigContent>
            )
        } else {
            return (<Login />)
        }
    }*/
}
