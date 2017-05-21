import * as React from "react";
import AppBar from 'material-ui/AppBar';
import { Link } from "react-router"
import styled from 'styled-components';

export interface ILayoutProps {

}

export interface ILayoutState {

}

const AppTitle = styled(Link)`
    color: inherit;
    text-decoration: inherit;
`;

export class Header extends React.Component<ILayoutProps, ILayoutState> {

    constructor() {
        super();
    }

    render() {
        return (
            <AppBar className={"navbar"} title={<AppTitle to="/team">TSAP</AppTitle>} showMenuIconButton={false} />
        );
    }
}
