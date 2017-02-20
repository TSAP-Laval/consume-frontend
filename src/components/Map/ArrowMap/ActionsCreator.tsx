import dispatcher from "../../dispatcher"
import * as Actions from "./Actions"
import Action from "./models/Action"
import Coordinate from "./models/Coordinate"
import {serverUrl} from "Config"
import IPlayerAction from "../../IPlayerAction"
import axios from "axios"

import { CreateErrorAction } from "../../Error/ErrorAction";

export function getActions(match_id: number, player_id: number) {
    const fetch_actions = new Actions.FetchActions()
    dispatcher.dispatch(fetch_actions)

    var url: string
    url = serverUrl + "/stats/match/" + match_id + "/player/" + player_id

    axios.get(url).then((response) => {
        var data = response.data.actions
        var actions = data.map((action: any) => {
            if(action.x2 != -1 && action.y2 != -1) {
                return new Action(action.TypeAction.name, new Coordinate(action.x1, action.y1), new Coordinate(action.x2, action.y2))
            } else {
                return new Action(action.TypeAction.name, new Coordinate(action.x1, action.y1))
            }
        })

        const receive_actions = new Actions.ReceiveActions(actions)
        dispatcher.dispatch(receive_actions)
    }).catch((error) => {
        CreateErrorAction(error);
    })
}   