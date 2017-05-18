import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import BigContent from "../components/Elements/BigContent";

export interface ILayoutProps {

}

export interface ILayoutState {

}

export default class Home extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
    }

    render() {
        return (
            <BigContent>
                <h1>Console TSAP</h1>
                <p>
                    <Link to="/team/3">
                        <RaisedButton primary={true} label="Statistiques de l'équipe" />
                    </Link>
                </p>
            </BigContent>
        );
    }
}
