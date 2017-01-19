import {IAction} from "../../IAction"

import Coordinate from "./models/Coordinate"
import Arrow from "./models/Arrow"

export class FetchArrows implements IAction {
    type: String

    constructor() {
        this.type = "FETCH_ARROWS"
    }
}

export class ReceiveArrows implements IAction {
    type: String
    arrows: Arrow[]

    constructor(arrows: Arrow[]) {
        this.type = "RECEIVE_ARROWS"
        this.arrows = arrows
    }

    getArrows() {
        return this.arrows
    }
}