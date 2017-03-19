import IAction from "../IAction"

export class Action implements IAction {
    type: string

    start: Coordinate
    end: Coordinate
    is_positive: boolean

    constructor(type: string, is_positive: boolean, start: Coordinate, end?: Coordinate) {
        this.type = type
        this.is_positive = is_positive
        this.start = start
        this.end = end
    }

    getCoordinates() {
        return [this.start.x, this.start.y, this.end.x, this.end.y]
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