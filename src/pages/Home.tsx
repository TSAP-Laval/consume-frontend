import * as React from "react";
import BigContent from "../components/Elements/BigContent";
import LoginStore from "../components/Login/Store";
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
            isLoggedIn : LoginStore.isLoggedIn
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
           isLoggedIn : LoginStore.isLoggedIn
        }) 
    }

    render() {
        if(this.userIsLoggedIn()) {
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
    }
}
