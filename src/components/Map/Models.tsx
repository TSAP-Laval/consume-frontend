export class IPlayerActions {
    match_id: string
    date: string
    actions: Action[]

    constructor(match_id: string, date: string, actions: Action[]) {
        this.match_id = match_id
        this.date = date
        this.actions = actions
    }
}

export class Action {
    type: ActionType
    start: Coordinate
    end: Coordinate
    is_positive: boolean

    constructor(type: ActionType, start: Coordinate, end: Coordinate, is_positive: boolean) {
        this.type = type
        this.start = start
        this.end = end
        this.is_positive = is_positive
    }
}

export class ActionType {
    name: string
    description: string

    constructor(name: string, description: string) {
        this.name = name
        this.description = description
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

export class Size {
    width: number
    height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }
}

export class Zone {
    coordinate: Coordinate
    percentage: number
    rating: number

    constructor(coordinate: Coordinate, percentage: number, rating: number) {
        this.coordinate = coordinate
        this.percentage = percentage
        this.rating = rating
    }
}

export class ZoneData {
    coordinate: Coordinate
    is_positive: boolean

    constructor(coordinate: Coordinate, is_positive: boolean) {
        this.coordinate = coordinate
        this.is_positive = is_positive
    }
}