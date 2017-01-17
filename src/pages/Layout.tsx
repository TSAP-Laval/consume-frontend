import * as React from "react";
import {Link} from "react-router"
import {Header} from "../components/Header";
import {Footer} from "../components/Footer"
import {ArrowMap} from "../components/ArrowMap/Index"

export interface ILayoutProps {}

export interface ILayoutState {}

export class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();
        this.state = {
            title: "TSAP-Consume"
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <ul>
                    <li><Link to="/">Page d'accueil</Link></li>
                    <li><Link to="/user">Page d'utilisateur</Link></li>
                </ul>
                    {this.props.children}
                <Footer/>
            </div>
        );
    }
}