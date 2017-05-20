import Dispatcher from "../Dispatcher"
import {serverUrl} from "Config"
import axios, {AxiosResponse} from "axios"
import * as Actions from "./Actions"
import {ITeam} from "../../models/DatabaseModels";
import { CreateErrorAction } from "../Error/ErrorAction";

const token: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoIiwidXNlciI6NSwiaWF0IjoxNDk1MjQ0MTQ4fQ.-xpppidIjMRqfGTMqo5fDYBOntGz7VmTaGFGSzUPe3g";

export function getTeam(team_id: number) {
    Dispatcher.dispatch(new Actions.FetchTeam());

    let url: string = serverUrl + "teams/" + team_id;
    let instance = axios.create({
        headers: {"X-Auth-Token":token}
    });

    instance.get(url).then((response: AxiosResponse) => {
        let data: ITeam = (response.data.data as ITeam);
        Dispatcher.dispatch(new Actions.ReceiveTeam(data))
    }).catch((error) => {
        CreateErrorAction(error);
    });
}