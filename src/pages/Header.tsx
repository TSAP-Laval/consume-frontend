import * as React from "react";

import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Link } from "react-router"

export interface ILayoutProps {}

export interface ILayoutState {}

export class Header extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            <a href="#">TSAP</a>
                        </Link>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        );
    }
}