import dispatcher from "../dispatcher"
import * as Actions from "./actions/GetData"
import * as Models from "./models/IPlayerActions"
import { IRawData } from "./models/BaseModels"
import { IZone } from "./models/BaseModels"
import {serverUrl} from "Config"
import axios from 'axios'

export function GetData(playerid: number, matchid: number) {
    const send = new Actions.GetData();
    dispatcher.dispatch(send);
    axios.get(serverUrl + '/stats/match/' + matchid + '/player/' + playerid) .then(function (response) {
      let data: Models.IPlayerActions = response.data as Models.IPlayerActions;
      const recieve = new Actions.RecieveData(data.actions);
      dispatcher.dispatch(recieve);
    })
    .catch(function (error) {
        console.log(error);
    });
}
