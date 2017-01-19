import Coordinate from "./Coordinate"

export default class Arrow {
    start: Coordinate
    end: Coordinate

    constructor(start: Coordinate, end: Coordinate) {
        this.start = start
        this.end = end
    }
}