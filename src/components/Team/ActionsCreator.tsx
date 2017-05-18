import dispatcher from "../Dispatcher"
import {serverUrl} from "Config"
import axios, {AxiosResponse} from "axios"
import * as Actions from "./Actions"
import {ITeam} from "../../models/DatabaseModels";

import { CreateErrorAction } from "../Error/ErrorAction";

export function getTeam(team_id: number) {
    dispatcher.dispatch(new Actions.FetchTeam());
    let url: string = serverUrl + "/teams/" + team_id;

    axios.get(url).then((response: AxiosResponse) => {
        let data: ITeam = (response.data.data as ITeam);
        dispatcher.dispatch(new Actions.ReceiveTeam(data))
    }).catch((error) => {
        CreateErrorAction(error);
    });
}

