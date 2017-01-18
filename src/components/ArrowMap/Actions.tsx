import {IAction} from "../IAction"

import Coordinate from "./models/Coordinate"
import Arrow from "./models/Arrow"

export class FetchArrows implements IAction {
    type: String
    arrows: Arrow[]

    constructor(match_id: number, player_id: number) {
        this.type = "FETCH_ARROWS"
        this.arrows = this.getArrows()
    }

    getArrows(){
        let arrows = new Array<Arrow>()

        for(var i = 1; i <= 5; i++) {
            let value = i * 10
            let coord = new Coordinate(value, value)
            arrows.push(new Arrow(coord, coord))
        }

        return arrows;
    }
}