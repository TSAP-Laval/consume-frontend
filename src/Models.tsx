export namespace ActionCreation {
    export interface IAction {
        type: string
    }
}

export namespace DatabaseModels {
    export class Action {
        id: number
        player_id: number
        type: ActionType
        start: Coordinate
        end: Coordinate

        constructor(id: number, player_id: number, type: ActionType, start: Coordinate, end: Coordinate = null) {
            this.id = id
            this.player_id = player_id
            this.type = type
            this.start = start
            this.end = end
        }
    }

    export class ActionType implements ComponentModels.IFilterable{
        id: number
        name: string
        description: string
        is_positive: boolean

        constructor(id: number, name: string, description: string, is_positive: boolean) {
            this.id = id
            this.name = name
            this.description = description
            this.is_positive = is_positive
        }

        toFilterNode() {
            return new ComponentModels.FilterNode(this.description, this.id.toString())
        }
    }

    export class Player {
        id: number
        first_name: string
        last_name: string
        current_team_id: number
        current_number: number
        current_position: Position

        constructor(id: number, first_name: string, last_name: string, 
                    current_team_id: number, current_number: number,  current_position: Position) {
                        this.id = id
                        this.first_name = first_name
                        this.last_name = last_name
                        this.current_team_id = current_team_id
                        this.current_number = current_number
                        this.current_position = current_position
                    }
    }

    export class Position {
        id: number
        description: string

        constructor(id: number, description: string) {
            this.id = id
            this.description = description
        }
    }

    export class Match {
        id: number
        home_team_id: number
        away_team_id: number
        date: Date
        location: string

        constructor(id: number, home_team_id: number, away_team_id: number, date: Date, location: string) {
            this.id = id
            this.home_team_id = home_team_id
            this.away_team_id = away_team_id
            this.date = date
            this.location = location
        }
    }

    export class Coordinate {
        x: number
        y: number

        constructor(x: number, y: number) {
            this.x = x
            this.y = y
        }
    }
}

export namespace ComponentModels {
    export interface IFilterable {
        toFilterNode(): FilterNode
    }

    export class Filter {
        name: string
        nodes: Array<FilterNode>
        colored: boolean

        constructor(name: string, nodes: Array<FilterNode> = new Array<FilterNode>(), colored: boolean = false) {
            this.name = name
            this.nodes = nodes
            this.colored = colored
        }
    }

    export class FilterNode {
        label: string
        value: string
        used: boolean
        color: RGBColor

        constructor(label: string, value: string, used: boolean = true, color: RGBColor = null) {
            this.label = label
            this.value = value
            this.used = used
        }
    }

    export class RGBColor {
        r: number
        g: number
        b: number

        constructor(r: number, g: number, b: number) {
            this.r = r
            this.g = g
            this.b = b
        }
    }
}