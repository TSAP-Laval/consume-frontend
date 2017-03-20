import {Coordinate} from "../Models"

export class Action {
    start: Coordinate
    end: Coordinate
    type: string
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