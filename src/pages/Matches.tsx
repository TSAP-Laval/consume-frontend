import * as React from "react";
import BigContent from '../components/Elements/BigContent';
import MatchList from '../components/Matches/Index';

export interface IMatchesProps {
    params?: {
        teamID: number
    }
}

export interface IMatchesState {}

export default class Matches extends React.Component<IMatchesProps, IMatchesState> {

    constructor() {
        super();
    }

    render() {
        let teamMatchesTitle = <h3>Parties jouées</h3>
        return (
            <BigContent>
                <MatchList teamID={this.props.params.teamID}/>
            </BigContent>
        );
    }
}
