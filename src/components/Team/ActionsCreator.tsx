import Dispatcher from "../Dispatcher"
import {serverUrl} from "Config"
import axios, {AxiosResponse} from "axios"
import * as Actions from "./Actions"
import {ITeam} from "../../models/DatabaseModels";
import { CreateErrorAction } from "../Error/ErrorAction";


export function getTeam(team_id: number, token: string) {
    Dispatcher.dispatch(new Actions.FetchTeam());

    let url: string = serverUrl + "/teams/" + team_id;
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

export function CreateGetTeamsAction(userId: number, token: string, isAdmin: boolean) {
    Dispatcher.dispatch(new Actions.FetchTeams());

let url: string = isAdmin ? serverUrl + "/teams":  serverUrl + "/users/" + userId;
    
    let instance = axios.create({
        headers: {"X-Auth-Token":token}
    });

    instance.get(url).then((response: AxiosResponse) => {
        let data: IUser = (response.data as IUser);
        Dispatcher.dispatch(new Actions.ReceiveTeams(data))
    }).catch((error) => {
        CreateErrorAction(error.response.data.message);
    });
}