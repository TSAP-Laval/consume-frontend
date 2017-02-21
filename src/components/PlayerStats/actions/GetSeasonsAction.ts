import IAction from '../../IAction';
import dispatcher from '../../dispatcher';

import { ISeason } from "../models/ISeason";

import { CreateErrorAction } from "../../Error/ErrorAction";

import { CreateSeasonsReceivedAction } from "./SeasonsReceivedAction";

import axios from 'axios'

import * as Config from 'Config';


export class GetSeasonsAction implements IAction {
    type = "GET_SEASONS";
}

export function CreateGetSeasonsAction() {
    dispatcher.dispatch(new GetSeasonsAction);

    var url: string = Config.serverUrl + "/seasons";

    axios.get(url).then(
        (response) => {
            CreateSeasonsReceivedAction(response.data as Array<ISeason>);
        },
        (err: Error) => {
            CreateErrorAction(err.toString());
        }
    )
}
