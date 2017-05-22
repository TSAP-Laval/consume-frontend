import * as React from "react";
import BigContent from "../components/Elements/BigContent";
import Li from '../components/Elements/Li';
import LoginStore from "../components/Login/Store";
import {RaisedButton} from "material-ui";
import { Link } from 'react-router';
import TeamList from "../components/Team/Views/TeamList";


export interface ILayoutProps {
}

export interface ILayoutState {
    isLoggedIn?: boolean
}

export default class Home extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
        this.state = {
            isLoggedIn: LoginStore.isLoggedIn
        }
    }

    render() {
        let adminOptions;
        if (LoginStore.isAdmin()) {
            adminOptions = <Link to="/users"><RaisedButton primary={true} label="Gestion des utilisateurs"/></Link>
        } else {
            adminOptions = null;
        }

        return (
            <BigContent>
                {
                    LoginStore.isAdmin()?
                        <Link to="/users"><RaisedButton primary={true} label="Gestion des Utilisateurs"/></Link>: null
                }
                <TeamList />
            </BigContent>
        )
    }
}
