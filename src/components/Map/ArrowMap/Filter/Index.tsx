/*import * as React from "react";
import Store from "../Store"

export interface ILayoutProps {}
export interface ILayoutState {}

export class ActionMapFilter extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)
        this.state = {
            action_types: new Array<string>(),
        }
    }

    componentDidMount() {
        Store.on("FETCH_ACTIONS", this.setLoadingStatus)
        Store.on("RECEIVE_ACTIONS", this.setActions)
    }

    render() {
        return(
            <h1>TEST</h1>
        );
    }
}*/