import Coordinate from "./Coordinate"

export default class Action {
    start: Coordinate
    end: Coordinate
    type: string

    constructor(type: string, start: Coordinate, end?: Coordinate) {
        this.type = type
        this.start = start
        this.end = end
    }

    getType() {
        return this.type
    }

    getCoordinates() {
        return [this.start.x, this.start.y, this.end.x, this.end.y]
    }
}