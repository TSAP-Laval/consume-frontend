import {IFilterable, FilterNode} from "./ComponentModels"

export enum ActionImpactId {
    Negative = -1,
    Neutral = 0,
    Positive = 1
}

export class Action {
    id: number;
    player_id: number;
    type: ActionType;
    impact: ActionImpact;
    start: Coordinate;
    end: Coordinate;

    constructor(id: number, player_id: number, type: ActionType, impact: ActionImpact, start: Coordinate, end: Coordinate = null) {
        this.id = id;
        this.player_id = player_id;
        this.type = type;
        this.impact = impact;
        this.start = start;
        this.end = end;
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
        return new FilterNode(this.description, this.id.toString());
    }
}

export class ActionImpact implements IFilterable {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    toFilterNode() {
        return new FilterNode(this.name, this.id.toString());
    }
}

export class Player {
    id: number;
    first_name: string;
    last_name: string;

    constructor(id: number, first_name: string, last_name: string) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
    }
}

export class PlayerDataByMatch {
    player_id: number;
    team_id: number;
    match_id: number;
    number: number;
    position: Position;

    constructor(player_id: number, team_id: number, match_id: number, number: number, position: Position) {
        this.player_id = player_id;
        this.team_id = team_id;
        this.match_id = match_id;
        this.number = number;
        this.position = position;
    }
}

export class Position {
    id: number;
    description: string;

    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
    }
}

export class Match {
    id: number;
    home_team_id: number;
    away_team_id: number;
    date: Date;
    location: string;

    constructor(id: number, home_team_id: number, away_team_id: number, date: Date, location: string) {
        this.id = id;
        this.home_team_id = home_team_id;
        this.away_team_id = away_team_id;
        this.date = date;
        this.location = location;
    }
}

export class Team {
    id: number;
    name: string;
    season: Season;
    players: Player[];

    constructor(id: number, name: string, season: Season, players: Player[]) {
        this.id = id;
        this.name = name;
        this.season = season;
        this.players = players;
    }
}

export class Season {
    id: number;
    start_year: number;
    end_year: number;

    constructor(id: number, start_year: number, end_year: number) {
        this.id = id;
        this.start_year = start_year;
        this.end_year = end_year;
    }
}

export class Metric {
    id: number;
    name: string;
    description: string;
    formula: string;

    constructor(id: number, name: string, description: string, formula: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.formula = formula;
    }
}

export class MetricData {
    metric: Metric;
    value: number;
    deviation: number;

    constructor(metric: Metric, value: number = 0, deviation:number = 0) {
        this.metric = metric;
        this.value = value;
        this.deviation = deviation;
    }
}

export class Coordinate {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}