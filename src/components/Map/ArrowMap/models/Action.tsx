import Coordinate from "./Coordinate"

export default class Action {
    start: Coordinate
    end: Coordinate

    constructor(start: Coordinate, end?: Coordinate) {
        this.start = start
        this.end = end
    }

    getCoordinates() {
        return [this.start.x, this.start.y, this.end.x, this.end.y]
    }
}