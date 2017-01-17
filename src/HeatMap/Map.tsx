import * as React from "react";
import * as Actions from "./Actions"
import Store from "./HeatMapStore"

export interface ILayoutProps {
    playerid:number
}

export interface ILayoutState {}

export default class HeatMap extends React.Component <ILayoutProps, ILayoutState>{
    constructor() {
        super();
        this.state = {
            zones: Store.getZones(this.props.playerid)
        }
    }

    componentWillMount() {
        Actions.GetData(this.props.playerid);
    }

    getZones() {
      this.setState({
        zones: Store.getZones(this.props.playerid)
      });
    }

}

