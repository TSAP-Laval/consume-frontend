import {IAction} from "../../../models/ActionCreation";
import Dispatcher from '../../Dispatcher';
import { ISeason } from "../Models/ISeason";
import { CreateErrorAction } from "../../Error/ErrorAction";
import { CreateSeasonsReceivedAction } from "./SeasonsReceivedAction";
import axios from 'axios'
import * as Config from 'Config';

export class GetSeasonsAction implements IAction {
    type = "GET_SEASONS";
}

export function CreateGetSeasonsAction() {
    Dispatcher.dispatch(new GetSeasonsAction);

    let url: string = Config.serverUrl + "/seasons";

    axios.get(url).then(
        (response) => {
            CreateSeasonsReceivedAction(response.data as Array<ISeason>);
        },
        (err: Error) => {
            CreateErrorAction(err.toString());
        }
    )
}
