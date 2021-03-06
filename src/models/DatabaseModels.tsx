import {IActionSummary, IMatchSummary, IMetricSummary, ITeamSummary, IUserSummary} from "./DatabaseModelsSummaries";

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

export interface ITeamMetricStats {
    metrics_avg: {[metric_id: string] : number}
    player_metrics: {[player_id: string] : {[metric_id: string] : {avg: number, last: number}}}
}

export interface IPlayerStats {
    match: IMatchSummary;
    metrics: {[metric_id: string]: number}
}

export interface IUser {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
    password?: string;
    teams?: ITeamSummary[];
}