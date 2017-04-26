import * as React from "react";
import { Link } from 'react-router';

import Spinner from "../../Elements/Spinner";
import CustomTable from "../../CustomTable/CustomTable"
import CustomRow from "../../CustomTable/CustomRow"
import FlatButton from 'material-ui/FlatButton';

import MatchesStore from "../Store"
import {Match} from "../Models"
import * as ActionsCreator from "../ActionsCreator"

export interface ILayoutProps {
    params: {
        teamID: number
        matchID: number
    }
}

export interface ILayoutState {
    match?: Match
}

export default class MatchDetails extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props)

        this.state = {
            match: null
        }
    }

    componentWillMount() {
        
    }

    componentWillUnmount() {

    }

    componentDidMount() {

    }

    render() {
        return(<p>alo</p>)
    }
}