import dispatcher from "../dispatcher"
import * as Actions from "./Actions"
import Arrow from "./models/Arrow"
import Coordinate from "./models/Coordinate"
import {serverUrl} from "Config"
import {ICoordinate} from "../ICoordinate"
import axios from "axios"

export function getArrows(match_id: number, player_id: number) {
    const fetch_arrows = new Actions.FetchArrows()
    dispatcher.dispatch(fetch_arrows)

    var url: string
    url = serverUrl + "/stats/match/" + match_id + "/player/" + player_id

    axios.get(url).then((response) => {
        var actions = response.data.actions
        var arrows = actions.map((action: ICoordinate) => {
            return new Arrow(new Coordinate(action.x1, action.y1), new Coordinate(action.x2, action.y2))
        })

        const receive_arrows = new Actions.ReceiveArrows(arrows)
        dispatcher.dispatch(receive_arrows)
    }).catch((error) => {
        console.log(error)
    })
}   