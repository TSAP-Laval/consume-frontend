import {IFilterable, FilterNode, RGBColor} from "./ComponentModels"
import {IActionSummary, IMatchSummary, IMetricSummary, ITeamSummary, IUserSummary} from "./DatabaseModelsSummaries";
import {IPosition} from "../components/PlayerStats/models/IPosition";

export enum ActionImpactId {
    Negative = -1,
    Neutral = 0,
    Positive = 1
}

export interface IActionType {
    id: number;
    name: string;
    description: string;
}

export class ActionImpact implements IFilterable {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    toFilterNode() {
        let color: RGBColor;

        switch(this.id) {
            case ActionImpactId.Negative:
                color = new RGBColor(255, 0, 0);
                break;
            case ActionImpactId.Neutral:
                color = new RGBColor(0, 0, 0);
                break;
            case ActionImpactId.Positive:
                color = new RGBColor(0, 128, 0);
                break;
        }
        return new FilterNode(this.name, this.id.toString(), true, color);
    }
}

export class ActionType implements IFilterable{
    id: number;
    name: string;
    description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    toFilterNode() {
        return new FilterNode(this.description, this.id.toString(), true);
    }
}

export interface IMatch {
    id: number;
    home_team: ITeamSummary;
    away_team: ITeamSummary;
    match_players: IMatchPlayerSummary[];
    actions: IActionSummary[];
    season: ISeason;
    date: Date;
}

export interface IMatchPlayerSummary {
    id: number;
    player: IPlayer;
    team_id: number;
    position: IPosition;
    number: number;
}

export interface IMetric {
    id: number;
    name: string;
    description: string;
    formula: string;
    team: ITeam;
}

export interface IMetricData {
    metric: IMetric;
    value: number;
    deviation: number;
}

export interface IPlayer {
    id: number;
    first_name: string;
    last_name: string;
}

export interface IPosition {
    id: number;
    description: string;
}

export interface ISeason {
    id: number;
    start_year: number;
    end_year: number;
}

export interface ITeam {
    id: number;
    name: string;
    city: string;
    matches: IMatchSummary[];
    metrics: IMetricSummary[];
    coaches: IUserSummary[];
    players: IPlayer[];
}


export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
    teams: ITeamSummary[];
}