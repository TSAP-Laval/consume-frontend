import * as React from "react";
import BigContent from '../components/Elements/BigContent';
import MatchList from '../components/Matches/Views/MatchList';

export interface IMatchesProps {
    params?: {
        team_id: number
    }
}

export interface IMatchesState {}

export default class Matches extends React.Component<IMatchesProps, IMatchesState> {

    constructor() {
        super();
    }

    render() {
        return (
            <BigContent>
                <h3>Parties jouées</h3>
                <MatchList params={this.props.params}/>
            </BigContent>
        );
    }
}
