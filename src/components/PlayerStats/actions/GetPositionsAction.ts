import IAction from '../../IAction';
import dispatcher from '../../dispatcher';

import { IPosition } from '../models/IPosition';

import { CreateErrorAction } from "../../Error/ErrorAction";

import { CreatePositionsReceivedAction } from "./PositionsReceivedActions";

import axios from 'axios'

import * as Config from 'Config';


export class GetPositionsAction implements IAction {
    type = "GET_POSITIONS";

    PlayerID: number;

    constructor(playerID: number) {
        this.PlayerID = playerID;
    }
}

export function CreateGetPositionsAction(playerID: number) {
    dispatcher.dispatch(new GetPositionsAction(playerID));

    var url: string = Config.serverUrl + "/stats/player/" + playerID + "/positions";

    axios.get(url).then(
        (response) => {
            CreatePositionsReceivedAction(response.data as Array<IPosition>);
        },
        (err: Error) => {
            CreateErrorAction(err.toString());
        }
    )
}
