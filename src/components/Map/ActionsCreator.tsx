import dispatcher from "../dispatcher"
import * as Actions from "./Actions"
import * as Models from "./Models"
import {serverUrl} from "Config"
import axios from "axios"

import { CreateErrorAction } from "../Error/ErrorAction";

export function getMatchActionsByPlayer(match_id: number, player_id: number) {
    const fetch_actions = new Actions.FetchActions()
    dispatcher.dispatch(fetch_actions)

    let url = serverUrl + "/stats/match/" + match_id + "/player/" + player_id

    axios.get(url).then((response) => {
        var data = response.data.actions
        var actions = data.map((action: any) => {
            let action_type = new Models.ActionType(action.TypeAction.name, action.TypeAction.description)

            if(action.x2 != -1 && action.y2 != -1) {
                return new Models.Action(action_type, new Models.Coordinate(action.x1, action.y1), new Models.Coordinate(action.x2, action.y2), action.is_valid)
            } else {
                return new Models.Action(action_type, new Models.Coordinate(action.x1, action.y1), null, action.is_valid)
            }
        })

        const receive_actions = new Actions.ReceiveActions(actions)
        dispatcher.dispatch(receive_actions)
    }).catch((error) => {
        CreateErrorAction(error);
    })
}

export function getMapParameters(team_id: number) {
     let url = serverUrl + "/teams/" + team_id + "/map";
     axios.get(url).then((response) => {
         var data = response.data;
         if(data.id == 0) {
             data.width = 4;
             data.height = 3;
         }
         var parameters = new Models.Size(data.width, data.height);
         const receive = new Actions.ReceiveMapParameters(parameters);
         dispatcher.dispatch(receive);
     }).catch((error) => {
         CreateErrorAction(error);
     })
 }
 
 export function setMapParameters(team_id: number, params: Models.Size) {
     let url = serverUrl + "/teams/" + team_id + "/map";
     axios.post(url, {height:params.height, width: params.width}).then((response) => {
     }).catch((error) => {
         CreateErrorAction(error);
     })
 }