//Database Models
export interface Season {
    start_year: number
    end_year: number
}

export interface Match {
    match_id: number
    home_team: Team
    away_team: Team
    date: Date
    location: String
}

export interface Team {
    team_id: number
    name: string
    season: Season
    players: Player[]
    metrics: Metric[]
}

export interface Player {
    player_id: number
    first_name: string
    last_name: string
}

export interface Context {
    team: Team
    match: Match
    player: Player
}

export interface Metric {
    metric_id: number;
    name: string;
    formula: number;
    deviation: number;
    team: Team
    last_match: Match;
}

export interface PlayerPosition {
    position_id: number
    name: string
    context: Context
}

export interface Coordinate {
    x: number
    y: number
}

export interface Action {
    action_id: string
    description: string
    start: Coordinate
    end: Coordinate
    is_positive: boolean
    context: Context
}

//View models
export interface ActionImpact {
    description: string
    is_positive: boolean
    used: boolean
}

export class ActionType {
    description: string
    color: RGBColor
    used: boolean
}

export class RGBColor {
    r: number
    g: number
    b: number
}

export interface Field {
    x_zones: number
    y_zones: number
    zones: Zone[]
}

export interface Zone {
    x_zone: number
    y_zone: number
    actions: Action[]
    percentage: number
    rating: number
}