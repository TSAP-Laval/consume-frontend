import {IActionType, ISeason} from "./DatabaseModels";

export interface IActionSummary {
    id: number;
    match_player_id: number;
    start_x: number;
    start_y: number;
    end_x: number;
    end_y: number;
    timestamp: string;
    home_score: number;
    away_score: number;
    impact: number;
    type: IActionType;
}

export interface IMatchSummary {
    id: number;
    home_team: ITeamSummary;
    away_team: ITeamSummary;
    season: ISeason;
    date: string;
}

export interface IMetricSummary {
    id: number;
    name: string;
    description: string;
    formula: string;
}

export interface ITeamSummary {
    id: number;
    name: string;
    city: string;
}

export interface IUserSummary {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
}