import * as React from "react";
import { injectGlobal } from 'styled-components';
import { MuiThemeProvider, getMuiTheme } from "material-ui/styles";
import  ErrorStore  from "../components/Error/Store";
import ErrorAlert from "../components/Error";
import {Drawer, MenuItem, AppBar, IconButton} from "material-ui";
import {Link, browserHistory} from "react-router";
import styled from 'styled-components';
import LoginStore from "../components/Login/Store"
import NavigationClose from "material-ui/svg-icons/navigation/close";

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export interface ILayoutProps {

}

export interface ILayoutState {
    menu_opened?: boolean,
    title?: string,
    Error?: string
}

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#2196F3",
    }
});

const AppTitle = styled(Link)`
    color: inherit;
    text-decoration: inherit;
`;

// Global Styling
injectGlobal`
    @font-face {
        font-family: 'Roboto', sans-serif;
    }

    html, body, #root, #root > div, main {
        position: relative;
        height: 100%;
        max-height: 100%;
        width: 100%;
        max-width: 100%;
        margin: 0;
        padding: 0;
    }
`;

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor() {
        super();

        this.state = {
            menu_opened: false,
            title: "TSAP-Consume",
            Error: null
        };

        this.getError = this.getError.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.redirect = this.redirect.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        ErrorStore.on("errorOccured", this.getError);
    }

    componentWillUnmount() {
        ErrorStore.removeListener("errorOccured", this.getError);
    }

    getError() {
        this.setState({
            Error: ErrorStore.getError()
        })
    }

    showMenu() {
        this.setState({
            menu_opened: !this.state.menu_opened
        });
    }

    redirect(path: string) {
        this.setState({
            menu_opened: false
        }, () => {
            browserHistory.push(path);
        });
    }

    logout() {
        this.setState({
            menu_opened: false
        }, () => {
            LoginStore.logout();
            browserHistory.push("/login");
        });
    }

    createMenu() {
        if(LoginStore.isLoggedIn) {
            let menu = [<AppBar key={"appbar"}  className={"navbar"} onLeftIconButtonTouchTap={this.showMenu} title={<AppTitle to="/team">TSAP</AppTitle>}/>];
            let items =  [<MenuItem key={"teams"}  onClick={() => {this.redirect("/team")}}>Équipes</MenuItem>, <MenuItem key={"logout"}  onClick={this.logout}>Déconnexion</MenuItem>];

            if(LoginStore.isAdmin()) {
                items.unshift(<MenuItem key={"admin"} onClick={() => {this.redirect("/users")}}>Gestion des utilisateurs</MenuItem>);
            }

            menu.push(<Drawer key={"drawer"} docked={false} open={this.state.menu_opened} onRequestChange={(open) => this.setState({menu_opened: open})}>
                <AppBar key={"menuitem"} className={"navbar"} iconElementLeft={<IconButton><NavigationClose /></IconButton>} onLeftIconButtonTouchTap={this.showMenu} />
                {items}
            </Drawer>);

            return(menu);
        }

        return(<AppBar key={"appbar"} showMenuIconButton={false} className={"navbar"} title={<AppTitle to="/team">TSAP</AppTitle>}/> )
    }

    render() {
        let errDiv = this.state.Error?
        <ErrorAlert Message={this.state.Error}/>:
        null;

        let menu = this.createMenu();

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    {menu}
                    <main>
                        { errDiv }
                        {this.props.children}
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}
