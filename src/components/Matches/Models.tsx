//Database Models
export class Season {
    start_year: number
    end_year: number
}

export class Match {
    match_id: number
    home_team: Team
    away_team: Team
    date: Date
    location: String
}

export class Team {
    team_id: number
    name: string
    season: Season
    players: Player[]
    metrics: Metric[]
}

export class Player {
    player_id: number
    first_name: string
    last_name: string
    number: number
    position: string
    actions: Action[]
}

export class Context {
    team: Team
    match: Match
    player: Player
}

export class Metric {
    metric_id: number;
    name: string;
    formula: number;
    deviation: number;
    team: Team
    last_match: Match;
}

export class Coordinate {
    x: number
    y: number
}

export class Action {
    action_id: string
    description: string
    start: Coordinate
    end: Coordinate
    is_positive: boolean
    context: Context
}

//View models
export class ActionImpact {
    description: string
    is_positive: boolean
    used: boolean
}

export class ActionType {
    description: string
    color: RGBColor
    used: boolean
}

export class TeamActions {
    match_id: number
    team_id: number
    location: string
    home_team_name: string
    away_team_name: string
    date: Date
    players: Player[]
}

export class RGBColor {
    r: number
    g: number
    b: number
}

export class Field {
    x_zones: number
    y_zones: number
    zones: Zone[]
}

export class Zone {
    x_zone: number
    y_zone: number
    actions: Action[]
    percentage: number
    rating: number
}